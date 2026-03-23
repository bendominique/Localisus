using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projetointegrador.API.Migrations
{
    /// <inheritdoc />
    public partial class AdicionandoAControllerEstoque : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataAtualizacao",
                table: "Medicamentos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "ItensEstoque",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantidade = table.Column<int>(type: "int", nullable: false),
                    MedicamentoId = table.Column<int>(type: "int", nullable: false),
                    HospitalId = table.Column<int>(type: "int", nullable: false),
                    ValidadeLote = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CodigoLote = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItensEstoque", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItensEstoque_Hospitais_HospitalId",
                        column: x => x.HospitalId,
                        principalTable: "Hospitais",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItensEstoque_Medicamentos_MedicamentoId",
                        column: x => x.MedicamentoId,
                        principalTable: "Medicamentos",
                        principalColumn: "IdMedicamento",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItensEstoque_HospitalId",
                table: "ItensEstoque",
                column: "HospitalId");

            migrationBuilder.CreateIndex(
                name: "IX_ItensEstoque_MedicamentoId",
                table: "ItensEstoque",
                column: "MedicamentoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItensEstoque");

            migrationBuilder.DropColumn(
                name: "DataAtualizacao",
                table: "Medicamentos");
        }
    }
}
