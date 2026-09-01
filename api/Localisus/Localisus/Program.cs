using Localisus.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;
using System.Text;

namespace Localisus
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // --------------------------------------------------
            // Controllers
            // --------------------------------------------------
            builder.Services.AddControllers();

            // --------------------------------------------------
            // Entity Framework / SQL Server
            // --------------------------------------------------
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection")
                )
            );

            // --------------------------------------------------
            // JWT Authentication
            // --------------------------------------------------
            var jwtKey = builder.Configuration["Jwt:Key"];

            if (string.IsNullOrWhiteSpace(jwtKey))
            {
                throw new InvalidOperationException(
                    "A chave JWT não foi configurada. Verifique Jwt:Key no appsettings.json."
                );
            }

            builder.Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtKey)
                        ),

                        ValidateIssuer = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],

                        ValidateAudience = true,
                        ValidAudience = builder.Configuration["Jwt:Audience"],

                        ValidateLifetime = true,

                        ClockSkew = TimeSpan.Zero
                    };
                });

            // --------------------------------------------------
            // Authorization
            // --------------------------------------------------
            builder.Services.AddAuthorization();

            // --------------------------------------------------
            // CORS
            // --------------------------------------------------
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // --------------------------------------------------
            // OpenAPI
            // --------------------------------------------------
            builder.Services.AddOpenApi();

            // --------------------------------------------------
            // Build application
            // --------------------------------------------------
            var app = builder.Build();

            // --------------------------------------------------
            // Development tools
            // --------------------------------------------------
            if (app.Environment.IsDevelopment())
            {
                app.MapScalarApiReference();
                app.MapOpenApi();
            }

            // --------------------------------------------------
            // Middleware
            // --------------------------------------------------
            app.UseHttpsRedirection();

            app.UseCors("AllowFrontend");

            app.UseAuthentication();

            app.UseAuthorization();

            // --------------------------------------------------
            // Controllers
            // --------------------------------------------------
            app.MapControllers();

            app.Run();
        }
    }
}