using API.Entities;
using API.Enums;

namespace API.Dtos.Project
{
    public class ProjectMemberResponseDto
    {
        public int ProjectId { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    }
}
