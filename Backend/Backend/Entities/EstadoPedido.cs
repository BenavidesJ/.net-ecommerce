using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class EstadoPedido
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string DescripcionEstado { get; set; }

        public ICollection<Pedido> Pedidos { get; set; }
    }
}
