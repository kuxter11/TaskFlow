using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Project
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public Guid CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<ProjectMember> Members { get; set; } = new List<ProjectMember>();
    }
}
