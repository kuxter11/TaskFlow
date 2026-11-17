using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Task
{
    public class CreateTaskDto
    {
        [Required(AllowEmptyStrings = false)]
        [MinLength(1)]
        [RegularExpression(@".*\S.*", ErrorMessage = "Title cannot be empty.")]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }
    }
}
