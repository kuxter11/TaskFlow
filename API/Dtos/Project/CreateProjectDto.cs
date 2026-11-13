using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Project
{
    public class CreateProjectDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
