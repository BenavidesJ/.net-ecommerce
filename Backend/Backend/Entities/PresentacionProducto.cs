using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class PresentacionProducto
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Producto")]
        public int ProductoID { get; set; }
        public Producto Producto { get; set; }

        public string Color { get; set; }
        public string Tamano { get; set; }
        public string SKU { get; set; }
        public string Imagen { get; set; }

        public ICollection<PedidoProducto> PedidoProductos { get; set; }
    }
}
