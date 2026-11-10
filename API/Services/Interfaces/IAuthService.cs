using API.Dtos.Auth;
using API.Dtos.Auth.Response;
using API.Entities;

namespace API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<TokenResponseDto?> LoginAsync(LoginUserDto request);
        Task<UserResponseDto?> RegisterAsync(RegisterUserDto request);
    }
}
