namespace API.Dtos.Auth.Response
{
    public class TokenResponseDto
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
        public required UserResponseDto User { get; set; }
    }
}
