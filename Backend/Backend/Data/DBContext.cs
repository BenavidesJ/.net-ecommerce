using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class DBContext : DbContext
    {

        public DBContext(DbContextOptions<DBContext> options): base(options) { }

        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<Producto> productos { get; set; }
        public DbSet<TipoUsuario> tipoUsuarios { get; set; }

        public DbSet<PresentacionProducto> presentacionProducto { get; set; }
        public DbSet<Pedido> pedidos { get; set; }
        public DbSet<EstadoPedido> estadoPedidos { get; set; }
        public DbSet<PedidoProducto> pedidoProductos { get; set; }

        public DbSet<DetalleUsuario> detalleUsuarios { get; set; }


    }
}
