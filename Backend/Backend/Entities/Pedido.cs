using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class Pedido
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Usuario")]
        public int UsuarioID { get; set; }
        public Usuario Usuario { get; set; }

        [ForeignKey("EstadoPedido")]
        public int EstadoID { get; set; }
        public EstadoPedido Estado { get; set; }

        [Required]
        public float MontoTotal { get; set; }

        [Required]
        public DateTime FechaCreacion { get; set; }

        public ICollection<PedidoProducto> PedidoProductos { get; set; }
    }
}
