using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projetointegrador.API.Migrations
{
    /// <inheritdoc />
    public partial class CorrigindoMedicamentosController : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NomeMedicamento",
                table: "Medicamentos",
                newName: "Nome");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Medicamentos",
                newName: "NomeMedicamento");
        }
    }
}
