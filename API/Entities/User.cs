using API.Enums;

namespace API.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; } = UserRole.User;
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public ICollection<TeamMember> Teams { get; set; } = new List<TeamMember>();
        public ICollection<ProjectMember> ProjectMemberships { get; set; } =
            new List<ProjectMember>();
    }
}
