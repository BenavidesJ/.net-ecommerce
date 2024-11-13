namespace Backend.DTOs
{
    public class PedidoDTO
    {
        public int ID { get; set; }
        public int UsuarioID { get; set; }
        public int EstadoID { get; set; }
        public float MontoTotal => Productos.Sum(p => p.CostoConIVA);
        public DateTime FechaCreacion { get; set; }
        public List<PedidoProductoDTO> Productos { get; set; }
    }

    public class PedidoProductoDTO
    {
        public int ID { get; set; }
        public string Nombre { get; set; }
        public string Color { get; set; }
        public string Tamano { get; set; }
        public float CostoConIVA { get; set; }
    }

    public class PedidoPatchDTO
    {
        public int? EstadoID { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public List<PedidoProductoDTO>? Productos { get; set; }
    }

    public class EstadoPedidoDTO
    {
        public int ID { get; set; }
        public string DescripcionEstado { get; set; }
    }

}
