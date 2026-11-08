using API.Enums;

namespace API.Dtos.Auth.Response
{
    public class RegisterUserResponseDto
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public UserRole Role { get; set; } = UserRole.User;
    }
}
