using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projetointegrador.API.Migrations
{
    /// <inheritdoc />
    public partial class ResolvendoErroControllerHospitais : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Endereco",
                table: "Hospitais",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Endereco",
                table: "Hospitais");
        }
    }
}
