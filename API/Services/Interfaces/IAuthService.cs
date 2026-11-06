using API.Dtos.Auth;
using API.Entities;

namespace API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<TokenResponseDto?> LoginAsync(LoginUserDto request);
        Task<RegisterUserDto?> RegisterAsync(RegisterUserDto request);
    }
}
