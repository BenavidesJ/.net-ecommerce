using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DTOs;
using Backend.Entities;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly DBContext _context;

        public PedidosController(DBContext context)
        {
            _context = context;
        }

        // GET: api/pedidos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetPedidos()
        {
            var pedidos = await _context.pedidos
                .Include(p => p.PedidoProductos)
                    .ThenInclude(pp => pp.PresentacionProducto)
                .Select(p => new PedidoDTO
                {
                    ID = p.ID,
                    UsuarioID = p.UsuarioID,
                    EstadoID = p.Estado.ID,
                    FechaCreacion = p.FechaCreacion,
                    Productos = p.PedidoProductos.Select(pp => new PedidoProductoDTO
                    {
                        ID = pp.PresentacionProductoID,
                        Nombre = pp.PresentacionProducto.Producto.Nombre,
                        Color = pp.PresentacionProducto.Color,
                        Tamano = pp.PresentacionProducto.Tamano,
                        CostoConIVA = pp.PresentacionProducto.Producto.Costo * 1.13f
                    }).ToList()
                })
                .ToListAsync();

            return Ok(pedidos);
        }

        // GET: api/pedidos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoDTO>> GetPedido(int id)
        {
            var pedido = await _context.pedidos
                .Include(p => p.PedidoProductos)
                    .ThenInclude(pp => pp.PresentacionProducto)
                .Where(p => p.ID == id)
                .Select(p => new PedidoDTO
                {
                    ID = p.ID,
                    UsuarioID = p.UsuarioID,
                    EstadoID = p.Estado.ID,
                    FechaCreacion = p.FechaCreacion,
                    Productos = p.PedidoProductos.Select(pp => new PedidoProductoDTO
                    {
                        ID = pp.PresentacionProductoID,
                        Nombre = pp.PresentacionProducto.Producto.Nombre,
                        Color = pp.PresentacionProducto.Color,
                        Tamano = pp.PresentacionProducto.Tamano,
                        CostoConIVA = pp.PresentacionProducto.Producto.Costo * 1.13f
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (pedido == null)
            {
                return NotFound();
            }

            return Ok(pedido);
        }

        // GET: api/pedidos/usuario/{usuarioId}
        [HttpGet("usuario/{usuarioId}")]
        public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetPedidosByUsuario(int usuarioId)
        {
            var pedidos = await _context.pedidos
                .Include(p => p.PedidoProductos)
                    .ThenInclude(pp => pp.PresentacionProducto)
                .Where(p => p.UsuarioID == usuarioId)
                .Select(p => new PedidoDTO
                {
                    ID = p.ID,
                    UsuarioID = p.UsuarioID,
                    EstadoID = p.Estado.ID,
                    FechaCreacion = p.FechaCreacion,
                    Productos = p.PedidoProductos.Select(pp => new PedidoProductoDTO
                    {
                        ID = pp.PresentacionProductoID,
                        Nombre = pp.PresentacionProducto.Producto.Nombre,
                        Color = pp.PresentacionProducto.Color,
                        Tamano = pp.PresentacionProducto.Tamano,
                        CostoConIVA = pp.PresentacionProducto.Producto.Costo * 1.13f
                    }).ToList()
                })
                .ToListAsync();

            return Ok(pedidos);
        }

        // PATCH: api/pedidos/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchPedido(int id, PedidoPatchDTO patchDto)
        {
            var pedido = await _context.pedidos
                .Include(p => p.PedidoProductos)
                .ThenInclude(pp => pp.PresentacionProducto)
                .FirstOrDefaultAsync(p => p.ID == id);

            if (pedido == null)
            {
                return NotFound();
            }

            // 1. Actualizar EstadoID
            if (patchDto.EstadoID.HasValue)
            {
                pedido.EstadoID = patchDto.EstadoID.Value;
            }

            // 2. Actualizar Fecha de Creación
            if (patchDto.FechaCreacion.HasValue)
            {
                pedido.FechaCreacion = patchDto.FechaCreacion.Value;
            }

            // 3. Manejo de Productos
            if (patchDto.Productos != null)
            {
                // Primero, eliminamos los productos que no están en el DTO (productos eliminados)
                var productosEnElPedido = pedido.PedidoProductos.ToList();
                foreach (var productoPedido in productosEnElPedido)
                {
                    if (!patchDto.Productos.Any(p => p.ID == productoPedido.PresentacionProductoID))
                    {
                        
                        var presentacionProducto = await _context.presentacionProducto
                            .FirstOrDefaultAsync(pp => pp.ID == productoPedido.PresentacionProductoID);

                        if (presentacionProducto != null)
                        {
                            presentacionProducto.Producto.Cantidad += 1;
                        }

                        _context.pedidoProductos.Remove(productoPedido);
                    }
                }

                // Ahora, agregamos los productos nuevos
                foreach (var productoDto in patchDto.Productos)
                {
                    var presentacionProducto = await _context.presentacionProducto
                        .Include(p => p.Producto)
                        .FirstOrDefaultAsync(pp => pp.ID == productoDto.ID);

                    if (presentacionProducto == null)
                    {
                        return BadRequest($"El producto con ID {productoDto.ID} no existe en la base de datos.");
                    }

                    // Validar si hay suficiente inventario
                    if (presentacionProducto.Producto.Cantidad < 1)
                    {
                        return BadRequest($"El producto {presentacionProducto.Producto.Nombre} no tiene suficiente inventario.");
                    }

                    // Verificar si el producto ya está en el pedido
                    var productoExistente = pedido.PedidoProductos
                        .FirstOrDefault(pp => pp.PresentacionProductoID == productoDto.ID);

                    if (productoExistente == null)
                    {
                        // Si el producto no existe en el pedido, lo agregamos
                        pedido.PedidoProductos.Add(new PedidoProducto
                        {
                            PresentacionProductoID = productoDto.ID,
                            PedidoID = pedido.ID
                        });

                        // Reducimos la cantidad del inventario al agregar un nuevo producto
                        presentacionProducto.Producto.Cantidad -= 1;
                    }
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }


        // POST: api/pedidos
        [HttpPost]
        public async Task<ActionResult<PedidoDTO>> CreatePedido([FromBody] PedidoDTO pedidoDto)
        {
            // Crear un nuevo objeto Pedido y mapear propiedades básicas
            var nuevoPedido = new Pedido
            {
                UsuarioID = pedidoDto.UsuarioID,
                EstadoID = 1, 
                FechaCreacion = DateTime.UtcNow,
                PedidoProductos = new List<PedidoProducto>()
            };

            // Procesar cada producto del DTO
            foreach (var productoDto in pedidoDto.Productos)
            {
                var presentacionProducto = await _context.presentacionProducto
                    .Include(p => p.Producto)
                    .FirstOrDefaultAsync(pp => pp.ID == productoDto.ID);

                if (presentacionProducto == null)
                {
                    return BadRequest($"El producto con ID {productoDto.ID} no existe en la base de datos.");
                }

                // Validar si hay suficiente inventario
                if (presentacionProducto.Producto.Cantidad < 1)
                {
                    return BadRequest($"El producto {presentacionProducto.Producto.Nombre} no tiene suficiente inventario.");
                }

                // Crear la relación de PedidoProducto y ajustar inventario
                nuevoPedido.PedidoProductos.Add(new PedidoProducto
                {
                    PresentacionProductoID = presentacionProducto.ID,
                    Pedido = nuevoPedido
                });

                presentacionProducto.Producto.Cantidad -= 1; // Rebajar la cantidad de inventario
            }

            // Guardar el nuevo pedido y actualizar inventario
            _context.pedidos.Add(nuevoPedido);
            await _context.SaveChangesAsync();

            // Retornar el nuevo pedido como respuesta
            var resultadoPedidoDto = new PedidoDTO
            {
                ID = nuevoPedido.ID,
                UsuarioID = nuevoPedido.UsuarioID,
                EstadoID = 1,
                FechaCreacion = nuevoPedido.FechaCreacion,
                Productos = nuevoPedido.PedidoProductos.Select(pp => new PedidoProductoDTO
                {
                    ID = pp.PresentacionProductoID,
                    Nombre = pp.PresentacionProducto.Producto.Nombre,
                    Color = pp.PresentacionProducto.Color,
                    Tamano = pp.PresentacionProducto.Tamano,
                    CostoConIVA = pp.PresentacionProducto.Producto.Costo * 1.13f
                }).ToList()
            };

            return CreatedAtAction(nameof(GetPedido), new { id = nuevoPedido.ID }, resultadoPedidoDto);
        }
    }
}
