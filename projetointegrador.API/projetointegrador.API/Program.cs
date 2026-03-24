
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using projetointegrador.API.Data;
using Scalar.AspNetCore;
using System.Text;

namespace projetointegrador.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            //agora vamos implementar a lógica da JWT no programa, permiitindo que o nosso [Authorize] funcione corretamente.
            var chaveSecreta = builder.Configuration.GetSection("JwtSettings:ChaveSecreta").Value; //aqui estamos lendo a chave secreta do nosso appsettings.json, que é a string que utilizamos para gerar o token JWT, e armazenando ela na variável chaveSecreta, para depois ser utilizada na configuração da autenticação JWT.
            var chaveValor =  Encoding.ASCII.GetBytes(chaveSecreta); //aqui estamos lendo a chave secreta do nosso appsettings.json e convertendo ela para um array de bytes criptografados, para depois ser utilizada na configuração da autenticação JWT.

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; //aq estamos definindo o esquema de autenticação padrão para JWT Bearer, ou seja, estamos dizendo que a nossa API vai utilizar a autenticação JWT Bearer como padrão para autenticar os usuários que acessarem as rotas protegidas com o [Authorize].
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; //se o nosso usuário tentar acessar uma rota protegida com o [Authorize] sem estar autenticado, ele vai receber um desafio de autenticação, que é a resposta do servidor dizendo que o acesso foi negado porque o usuário não está autenticado, e nesse caso,
                //o desafio de autenticação também vai utilizar o esquema JWT Bearer, ou seja, ele vai dizer que o acesso foi negado porque o token JWT não foi fornecido ou é inválido.
            })
                .AddJwtBearer(options =>
                {
                   options.RequireHttpsMetadata = false;
                    options.SaveToken = true; //permite o .net acessar o nosso token jwt para validar as rotas protegidas com o [Authorize], ou seja,
                                              //ele salva o token JWT no contexto da requisição, permitindo que o .net acesse as informações do token para validar se o usuário tem acesso à rota protegida.
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false, //verifica se o emissor do token JWT é válido   
                        ValidateAudience = false, //verifica se o token JWT é destinado e foi emitido para a aplicação correta, garantindo que o token não seja utilizado por terceiros em outras aplicações.
                        ValidateLifetime = true, //verifica o tempo de expiração do token 
                        ValidateIssuerSigningKey = true, //verifica se a chave de assinatura do token é válida, ou seja, se o token foi assinado com a chave secreta correta, garantindo que o token não foi alterado ou forjado por terceiros.
                        IssuerSigningKey = new SymmetricSecurityKey(chaveValor), //aqui estamos definindo a chave de assinatura do token JWT, que é a chave secreta convertida para um array de bytes criptografados, que foi lida do nosso appsettings.json,
                                                                                 //e essa chave de assinatura é utilizada para validar se o token JWT foi assinado com a chave secreta correta, garantindo a segurança do token.
                        ClockSkew = TimeSpan.Zero //não permite que o token seja acessado após o tempo de expiração. 
                    };
                });

            //agora configuramos o CORS para permitir que a nossa API seja acessada por qualquer origem, ou seja, por qualquer domínio, o que é importante para permitir que a nossa API seja consumida por diferentes clientes, como aplicações web, mobile, etc. E também o frontend
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("LocalisusApp", policy =>
                {
                    policy.AllowAnyOrigin() //permite que a API seja acessada por qualquer origem, ou seja, por qualquer domínio, o que é importante para permitir que a nossa API seja consumida por diferentes clientes, como aplicações web, mobile, etc. E também o frontend
                          .AllowAnyMethod() //permite que a API seja acessada por qualquer método HTTP, como GET, POST, PUT, DELETE, etc., o que é importante para permitir que a nossa API seja consumida de forma flexível por diferentes clientes.
                          .AllowAnyHeader(); //permite que a API seja acessada por qualquer cabeçalho HTTP, o que é importante para permitir que a nossa API seja consumida de forma flexível por diferentes clientes, e também para permitir que os clientes possam enviar informações adicionais no cabeçalho da requisição, como tokens de autenticação, etc.
                });
            });

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            // Configure the HTTP request pipeline.             
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                //importando o uso do scalar para a nossa API
                app.MapScalarApiReference();
            }

            app.UseHttpsRedirection();

            app.UseCors("LocalisusApp"); //agora estamos aplicando a política de CORS que foi configurada anteriormente, permitindo que a nossa API seja acessada por qualquer origem, método e cabeçalho, o que é importante para permitir que a nossa API seja consumida de forma flexível por diferentes clientes, como aplicações web, mobile, etc. E também o frontend)

            //agora definimos a ordem dos middlewares de autenticação e autorização, para garantir que a autenticação seja realizada antes da autorização,
            //ou seja, para garantir que o usuário seja autenticado antes de verificar se ele tem permissão para acessar as rotas protegidas com o [Authorize].
            app.UseAuthentication(); //o middleware de autenticação é responsável por autenticar o usuário, ou seja, por validar o token JWT fornecido na requisição e extrair as informações do usuário do token, como o id, o tipo de usuário, o id do hospital, etc., para que essas informações possam ser utilizadas posteriormente no processo de autorização.
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
