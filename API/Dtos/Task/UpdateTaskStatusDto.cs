using System.ComponentModel.DataAnnotations;
using API.Enums;

namespace API.Dtos.Task
{
    public class UpdateTaskStatusDto
    {
        [Required]
        [EnumDataType(typeof(ProjectTaskStatus))]
        public ProjectTaskStatus Status { get; set; }
    }
}
