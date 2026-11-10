using API.Dtos.Auth.Response;

namespace API.Dtos.Auth
{
    public class AuthResponseDto
    {
        public required string AccessToken { get; set; }
        public required UserResponseDto User { get; set; }
    }
}
