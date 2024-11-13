using Backend.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Backend.Lib
{
    public class Utilities
    {
        private readonly IConfiguration _configuration;
        public Utilities(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string encriptarSHA256(string texto)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(texto));

                StringBuilder builder1 = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder1.Append(bytes[i].ToString("x2"));
                }

                return builder1.ToString();
            }

        }

        public string generarJWT(Usuario usuarioModelo)
        {
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuarioModelo.ID.ToString()),
                new Claim(ClaimTypes.Email, usuarioModelo.Correo!)
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var jwtConfig = new JwtSecurityToken(
               claims: userClaims,
               expires: DateTime.UtcNow.AddHours(1),
               signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        }

    }
}
