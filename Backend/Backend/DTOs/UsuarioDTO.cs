namespace Backend.DTOs
{
    public class UsuarioDTO
    {
        public int ID { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }
        public string TipoUsuario { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public string MetodoPagoPreferido { get; set; }
    }

    public class UsuarioModificadoDTO
    {
        public int? ID { get; set; }
        public string? Correo { get; set; }
        public string? Password { get; set; }
        public string? TipoUsuario { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Telefono { get; set; }
        public string? Direccion { get; set; }
        public string? MetodoPagoPreferido { get; set; }
    }
}
