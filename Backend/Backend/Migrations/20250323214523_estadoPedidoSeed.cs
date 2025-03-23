using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class estadoPedidoSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "estadoPedidos",
                columns: new[] { "ID", "DescripcionEstado" },
                values: new object[] { 1, "Pendiente" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "estadoPedidos",
                keyColumn: "ID",
                keyValue: 1);
        }
    }
}
