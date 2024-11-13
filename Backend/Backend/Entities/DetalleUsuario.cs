using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class DetalleUsuario
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Usuario")]
        public int UsuarioID { get; set; }
        public Usuario Usuario { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Apellido { get; set; }

        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public string MetodoPagoPreferido { get; set; }
    }
}
