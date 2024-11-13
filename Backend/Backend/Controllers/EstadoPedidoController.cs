using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data; 
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoPedidoController : ControllerBase
    {
        private readonly DBContext _context;

        public EstadoPedidoController(DBContext context)
        {
            _context = context;
        }

        // GET: api/EstadoPedido
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadoPedidoDTO>>> GetEstados()
        {
 
            var estados = await _context.estadoPedidos
            .Select(e => new EstadoPedidoDTO
                                         {
                                             ID = e.ID,
                                             DescripcionEstado = e.DescripcionEstado
                                         })
                                         .ToListAsync();

            // Si no se encuentran estados, retornar NotFound
            if (estados == null || estados.Count == 0)
            {
                return NotFound("No se encontraron estados de pedido.");
            }

            // Retornar la lista de estados encontrados
            return Ok(estados);
        }
    }
}
