using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class PedidoProducto
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Pedido")]
        public int PedidoID { get; set; }
        public Pedido Pedido { get; set; }

        [ForeignKey("PresentacionProducto")]
        public int PresentacionProductoID { get; set; }
        public PresentacionProducto PresentacionProducto { get; set; }

        [Required]
        public int Cantidad { get; set; }
    }
}
