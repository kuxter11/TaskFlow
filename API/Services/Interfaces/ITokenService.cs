using API.Dtos.Auth;
using API.Entities;

namespace API.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
        string GenerateRefreshToken();
        Task<string> GenerateAndSaveRefreshToken(User user);
        Task<TokenResponseDto> CreateTokenResponse(User user);
        Task<User?> ValidateRefreshTokenAsync(Guid userId, string refreshToken);
        Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request);
    }
}
