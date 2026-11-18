using API.Enums;

namespace API.Entities
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ProjectTaskStatus Status { get; set; } = ProjectTaskStatus.ToDo;

        public Guid CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid? AssigneeId { get; set; }
    }
}
