using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Dtos.Auth.Response;
using API.Entities;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService(IUserRepository userRepository, IConfiguration configuration)
        : ITokenService
    {
        public async Task<TokenResponseDto?> RefreshTokenAsync(string refreshToken)
        {
            var user = await ValidateRefreshTokenAsync(refreshToken);
            if (user is null)
            {
                return null;
            }

            return await CreateTokenResponse(user);
        }

        public async Task<TokenResponseDto> CreateTokenResponse(User user)
        {
            return new TokenResponseDto
            {
                AccessToken = CreateToken(user),
                RefreshToken = await GenerateAndSaveRefreshToken(user),
                User = new UserResponseDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    Role = user.Role,
                },
            };
        }

        public async Task<User?> ValidateRefreshTokenAsync(string refreshToken)
        {
            var user = await userRepository.GetByRefreshTokenAsync(refreshToken);
            if (
                user is null
                || user.RefreshTokenExpiryTime is null
                || user.RefreshTokenExpiryTime <= DateTime.UtcNow
            )
            {
                return null;
            }

            return user;
        }

        public async Task RevokeRefreshTokenAsync(string refreshToken)
        {
            var user = await userRepository.GetByRefreshTokenAsync(refreshToken);

            if (user is null)
            {
                return;
            }

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;

            await userRepository.SaveChangesAsync();
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public async Task<String> GenerateAndSaveRefreshToken(User user)
        {
            var refreshToken = GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await userRepository.SaveChangesAsync();

            return refreshToken;
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
