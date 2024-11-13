using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InicializarBD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EstadoPedido",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DescripcionEstado = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstadoPedido", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "productos",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    Costo = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productos", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "tipoUsuarios",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DescripcionTipo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipoUsuarios", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PresentacionProducto",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductoID = table.Column<int>(type: "int", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tamano = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SKU = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Imagen = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentacionProducto", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PresentacionProducto_productos_ProductoID",
                        column: x => x.ProductoID,
                        principalTable: "productos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Correo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TipoID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuarios", x => x.ID);
                    table.ForeignKey(
                        name: "FK_usuarios_tipoUsuarios_TipoID",
                        column: x => x.TipoID,
                        principalTable: "tipoUsuarios",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleUsuario",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsuarioID = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Apellido = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direccion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MetodoPagoPreferido = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleUsuario", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DetalleUsuario_usuarios_UsuarioID",
                        column: x => x.UsuarioID,
                        principalTable: "usuarios",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pedido",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsuarioID = table.Column<int>(type: "int", nullable: false),
                    EstadoID = table.Column<int>(type: "int", nullable: false),
                    MontoTotal = table.Column<float>(type: "real", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedido", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Pedido_EstadoPedido_EstadoID",
                        column: x => x.EstadoID,
                        principalTable: "EstadoPedido",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pedido_usuarios_UsuarioID",
                        column: x => x.UsuarioID,
                        principalTable: "usuarios",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PedidoProducto",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PedidoID = table.Column<int>(type: "int", nullable: false),
                    PresentacionProductoID = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PedidoProducto", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PedidoProducto_Pedido_PedidoID",
                        column: x => x.PedidoID,
                        principalTable: "Pedido",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PedidoProducto_PresentacionProducto_PresentacionProductoID",
                        column: x => x.PresentacionProductoID,
                        principalTable: "PresentacionProducto",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetalleUsuario_UsuarioID",
                table: "DetalleUsuario",
                column: "UsuarioID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_EstadoID",
                table: "Pedido",
                column: "EstadoID");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_UsuarioID",
                table: "Pedido",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_PedidoProducto_PedidoID",
                table: "PedidoProducto",
                column: "PedidoID");

            migrationBuilder.CreateIndex(
                name: "IX_PedidoProducto_PresentacionProductoID",
                table: "PedidoProducto",
                column: "PresentacionProductoID");

            migrationBuilder.CreateIndex(
                name: "IX_PresentacionProducto_ProductoID",
                table: "PresentacionProducto",
                column: "ProductoID");

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_TipoID",
                table: "usuarios",
                column: "TipoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetalleUsuario");

            migrationBuilder.DropTable(
                name: "PedidoProducto");

            migrationBuilder.DropTable(
                name: "Pedido");

            migrationBuilder.DropTable(
                name: "PresentacionProducto");

            migrationBuilder.DropTable(
                name: "EstadoPedido");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropTable(
                name: "productos");

            migrationBuilder.DropTable(
                name: "tipoUsuarios");
        }
    }
}
