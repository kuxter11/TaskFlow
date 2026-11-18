using System.ComponentModel.DataAnnotations;
using API.Enums;

namespace API.Dtos.Task
{
    public class UpdateTaskDto
    {
        [Required(AllowEmptyStrings = false)]
        [RegularExpression(@".*\S.*", ErrorMessage = "Title cannot be empty.")]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [EnumDataType(typeof(ProjectTaskStatus))]
        public ProjectTaskStatus Status { get; set; }
        public Guid? AssigneeId { get; set; }
    }
}
