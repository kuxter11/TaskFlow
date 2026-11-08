using API.Dtos.Auth;
using API.Dtos.Auth.Response;
using API.Entities;
using API.Enums;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace API.Services
{
    public class AuthService(ITokenService tokenService, IUserRepository userRepository)
        : IAuthService
    {
        public async Task<TokenResponseDto?> LoginAsync(LoginUserDto dto)
        {
            var user = await userRepository.GetByUsernameAsync(dto.Username);
            if (user is null)
            {
                return null;
            }

            if (
                new PasswordHasher<User>().VerifyHashedPassword(
                    user,
                    user.PasswordHash,
                    dto.Password
                ) == PasswordVerificationResult.Failed
            )
            {
                return null;
            }

            return await tokenService.CreateTokenResponse(user);
        }

        public async Task<RegisterUserResponseDto?> RegisterAsync(RegisterUserDto dto)
        {
            var existingUser = await userRepository.GetByUsernameAsync(dto.Username);
            if (existingUser is not null)
            {
                throw new Exception("Username already exists.");
            }

            if (dto.Password != dto.ConfirmPassword)
            {
                throw new Exception("Passwords do not match.");
            }

            var newUser = new User();
            var hashedPassword = new PasswordHasher<User>().HashPassword(newUser, dto.Password);

            newUser.Username = dto.Username;
            newUser.Email = dto.Email;
            newUser.PasswordHash = hashedPassword;
            newUser.Role = UserRole.User; // Default role

            await userRepository.AddAsync(newUser);
            return new RegisterUserResponseDto
            {
                Username = newUser.Username,
                Email = newUser.Email,
                Role = newUser.Role,
            };
        }
    }
}
