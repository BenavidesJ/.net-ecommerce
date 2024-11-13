using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AceptarNulosEnUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_usuarios_tipoUsuarios_TipoID",
                table: "usuarios");

            migrationBuilder.AlterColumn<int>(
                name: "TipoID",
                table: "usuarios",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_usuarios_tipoUsuarios_TipoID",
                table: "usuarios",
                column: "TipoID",
                principalTable: "tipoUsuarios",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_usuarios_tipoUsuarios_TipoID",
                table: "usuarios");

            migrationBuilder.AlterColumn<int>(
                name: "TipoID",
                table: "usuarios",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_usuarios_tipoUsuarios_TipoID",
                table: "usuarios",
                column: "TipoID",
                principalTable: "tipoUsuarios",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
