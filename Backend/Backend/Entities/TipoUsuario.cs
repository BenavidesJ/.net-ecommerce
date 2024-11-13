using System.ComponentModel.DataAnnotations;

namespace Backend.Entities
{
    public class TipoUsuario
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string DescripcionTipo { get; set; }

        public ICollection<Usuario> Usuarios { get; set; }
    }
}
