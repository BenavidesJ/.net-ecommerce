using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class NuevasTablas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetalleUsuario_usuarios_UsuarioID",
                table: "DetalleUsuario");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_EstadoPedido_EstadoID",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedido_usuarios_UsuarioID",
                table: "Pedido");

            migrationBuilder.DropForeignKey(
                name: "FK_PedidoProducto_Pedido_PedidoID",
                table: "PedidoProducto");

            migrationBuilder.DropForeignKey(
                name: "FK_PedidoProducto_PresentacionProducto_PresentacionProductoID",
                table: "PedidoProducto");

            migrationBuilder.DropForeignKey(
                name: "FK_PresentacionProducto_productos_ProductoID",
                table: "PresentacionProducto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PresentacionProducto",
                table: "PresentacionProducto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PedidoProducto",
                table: "PedidoProducto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pedido",
                table: "Pedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EstadoPedido",
                table: "EstadoPedido");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DetalleUsuario",
                table: "DetalleUsuario");

            migrationBuilder.RenameTable(
                name: "PresentacionProducto",
                newName: "presentacionProducto");

            migrationBuilder.RenameTable(
                name: "PedidoProducto",
                newName: "pedidoProductos");

            migrationBuilder.RenameTable(
                name: "Pedido",
                newName: "pedidos");

            migrationBuilder.RenameTable(
                name: "EstadoPedido",
                newName: "estadoPedidos");

            migrationBuilder.RenameTable(
                name: "DetalleUsuario",
                newName: "detalleUsuarios");

            migrationBuilder.RenameIndex(
                name: "IX_PresentacionProducto_ProductoID",
                table: "presentacionProducto",
                newName: "IX_presentacionProducto_ProductoID");

            migrationBuilder.RenameIndex(
                name: "IX_PedidoProducto_PresentacionProductoID",
                table: "pedidoProductos",
                newName: "IX_pedidoProductos_PresentacionProductoID");

            migrationBuilder.RenameIndex(
                name: "IX_PedidoProducto_PedidoID",
                table: "pedidoProductos",
                newName: "IX_pedidoProductos_PedidoID");

            migrationBuilder.RenameIndex(
                name: "IX_Pedido_UsuarioID",
                table: "pedidos",
                newName: "IX_pedidos_UsuarioID");

            migrationBuilder.RenameIndex(
                name: "IX_Pedido_EstadoID",
                table: "pedidos",
                newName: "IX_pedidos_EstadoID");

            migrationBuilder.RenameIndex(
                name: "IX_DetalleUsuario_UsuarioID",
                table: "detalleUsuarios",
                newName: "IX_detalleUsuarios_UsuarioID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_presentacionProducto",
                table: "presentacionProducto",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_pedidoProductos",
                table: "pedidoProductos",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_pedidos",
                table: "pedidos",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_estadoPedidos",
                table: "estadoPedidos",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_detalleUsuarios",
                table: "detalleUsuarios",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_detalleUsuarios_usuarios_UsuarioID",
                table: "detalleUsuarios",
                column: "UsuarioID",
                principalTable: "usuarios",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_pedidoProductos_pedidos_PedidoID",
                table: "pedidoProductos",
                column: "PedidoID",
                principalTable: "pedidos",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_pedidoProductos_presentacionProducto_PresentacionProductoID",
                table: "pedidoProductos",
                column: "PresentacionProductoID",
                principalTable: "presentacionProducto",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_pedidos_estadoPedidos_EstadoID",
                table: "pedidos",
                column: "EstadoID",
                principalTable: "estadoPedidos",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_pedidos_usuarios_UsuarioID",
                table: "pedidos",
                column: "UsuarioID",
                principalTable: "usuarios",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_presentacionProducto_productos_ProductoID",
                table: "presentacionProducto",
                column: "ProductoID",
                principalTable: "productos",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_detalleUsuarios_usuarios_UsuarioID",
                table: "detalleUsuarios");

            migrationBuilder.DropForeignKey(
                name: "FK_pedidoProductos_pedidos_PedidoID",
                table: "pedidoProductos");

            migrationBuilder.DropForeignKey(
                name: "FK_pedidoProductos_presentacionProducto_PresentacionProductoID",
                table: "pedidoProductos");

            migrationBuilder.DropForeignKey(
                name: "FK_pedidos_estadoPedidos_EstadoID",
                table: "pedidos");

            migrationBuilder.DropForeignKey(
                name: "FK_pedidos_usuarios_UsuarioID",
                table: "pedidos");

            migrationBuilder.DropForeignKey(
                name: "FK_presentacionProducto_productos_ProductoID",
                table: "presentacionProducto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_presentacionProducto",
                table: "presentacionProducto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_pedidos",
                table: "pedidos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_pedidoProductos",
                table: "pedidoProductos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_estadoPedidos",
                table: "estadoPedidos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_detalleUsuarios",
                table: "detalleUsuarios");

            migrationBuilder.RenameTable(
                name: "presentacionProducto",
                newName: "PresentacionProducto");

            migrationBuilder.RenameTable(
                name: "pedidos",
                newName: "Pedido");

            migrationBuilder.RenameTable(
                name: "pedidoProductos",
                newName: "PedidoProducto");

            migrationBuilder.RenameTable(
                name: "estadoPedidos",
                newName: "EstadoPedido");

            migrationBuilder.RenameTable(
                name: "detalleUsuarios",
                newName: "DetalleUsuario");

            migrationBuilder.RenameIndex(
                name: "IX_presentacionProducto_ProductoID",
                table: "PresentacionProducto",
                newName: "IX_PresentacionProducto_ProductoID");

            migrationBuilder.RenameIndex(
                name: "IX_pedidos_UsuarioID",
                table: "Pedido",
                newName: "IX_Pedido_UsuarioID");

            migrationBuilder.RenameIndex(
                name: "IX_pedidos_EstadoID",
                table: "Pedido",
                newName: "IX_Pedido_EstadoID");

            migrationBuilder.RenameIndex(
                name: "IX_pedidoProductos_PresentacionProductoID",
                table: "PedidoProducto",
                newName: "IX_PedidoProducto_PresentacionProductoID");

            migrationBuilder.RenameIndex(
                name: "IX_pedidoProductos_PedidoID",
                table: "PedidoProducto",
                newName: "IX_PedidoProducto_PedidoID");

            migrationBuilder.RenameIndex(
                name: "IX_detalleUsuarios_UsuarioID",
                table: "DetalleUsuario",
                newName: "IX_DetalleUsuario_UsuarioID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PresentacionProducto",
                table: "PresentacionProducto",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pedido",
                table: "Pedido",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PedidoProducto",
                table: "PedidoProducto",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EstadoPedido",
                table: "EstadoPedido",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DetalleUsuario",
                table: "DetalleUsuario",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleUsuario_usuarios_UsuarioID",
                table: "DetalleUsuario",
                column: "UsuarioID",
                principalTable: "usuarios",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_EstadoPedido_EstadoID",
                table: "Pedido",
                column: "EstadoID",
                principalTable: "EstadoPedido",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedido_usuarios_UsuarioID",
                table: "Pedido",
                column: "UsuarioID",
                principalTable: "usuarios",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoProducto_Pedido_PedidoID",
                table: "PedidoProducto",
                column: "PedidoID",
                principalTable: "Pedido",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoProducto_PresentacionProducto_PresentacionProductoID",
                table: "PedidoProducto",
                column: "PresentacionProductoID",
                principalTable: "PresentacionProducto",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PresentacionProducto_productos_ProductoID",
                table: "PresentacionProducto",
                column: "ProductoID",
                principalTable: "productos",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
