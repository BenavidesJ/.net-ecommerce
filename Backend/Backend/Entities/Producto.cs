using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class Producto
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public int Cantidad { get; set; }

        [Required]
        public float Costo { get; set; }

        public ICollection<PresentacionProducto> Presentaciones { get; set; }
    }

    public class ProductoPatchDTO
    {
        public string? Nombre { get; set; }
        public int? Cantidad { get; set; }
        public float? Costo { get; set; }
    }
}
