using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities
{
    public class Usuario
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [EmailAddress]
        public string Correo { get; set; }

        [Required]
        public string Password { get; set; }

        [ForeignKey("TipoUsuario")]
        public int? TipoID { get; set; }
        public TipoUsuario TipoUsuario { get; set; }

        public DetalleUsuario DetalleUsuario { get; set; }
        public ICollection<Pedido> Pedidos { get; set; }
    }
}
