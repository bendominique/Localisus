using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projetointegrador.API.Migrations
{
    /// <inheritdoc />
    public partial class ConfiguracaoCorsEJWT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Hospitais",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Hospitais",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Hospitais");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Hospitais");
        }
    }
}
