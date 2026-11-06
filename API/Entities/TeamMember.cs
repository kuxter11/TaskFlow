using API.Enums;

namespace API.Entities
{
    public class TeamMember
    {
        public int TeamId { get; set; }
        public Team Team { get; set; } = null!;
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public TeamRole Role { get; set; } = TeamRole.Member;
    }
}
