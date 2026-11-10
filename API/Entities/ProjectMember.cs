using API.Enums;

namespace API.Entities
{
    public class ProjectMember
    {
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    }
}
