using API.Enums;

namespace API.Dtos.Team
{
    public class TeamMemberDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public DateTime JoinedAt { get; set; }
        public TeamRole Role { get; set; } = TeamRole.Member;
    }
}
