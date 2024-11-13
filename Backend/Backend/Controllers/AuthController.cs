using Backend.Data;
using Backend.DTOs;
using Backend.Entities;
using Backend.Lib;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DBContext _appDBContext;
        private readonly Utilities _utilidades;
        public AuthController(DBContext appDBContext, Utilities utilidades)
        {
            _appDBContext = appDBContext;
            _utilidades = utilidades;
        }

        [HttpPost]
        [Route("registro")]
        public async Task<IActionResult> registro(AuthDTO objUsuario)
        {
            var modeloUsuario = new Usuario
            {
                Correo = objUsuario.Correo,
                Password = _utilidades.encriptarSHA256(objUsuario.Password)
            };

            await _appDBContext.usuarios.AddAsync(modeloUsuario);
            await _appDBContext.SaveChangesAsync();

            if (modeloUsuario.ID != 0)
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false });
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login(AuthDTO objLogin)
        {
            var usuario = await _appDBContext.usuarios
                .Where(u =>
                    u.Correo == objLogin.Correo &&
                    u.Password == _utilidades.encriptarSHA256(objLogin.Password)
                ).FirstOrDefaultAsync();


            if (usuario == null)
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            }
            else
            {
                var datosUsuario = new Usuario
                {
                    ID = usuario.ID,
                    Correo = usuario.Correo
                };
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _utilidades.generarJWT(usuario), id = datosUsuario.ID });
            }
        }
    }
}