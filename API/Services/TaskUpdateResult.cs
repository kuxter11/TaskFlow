using API.Dtos.Task;

namespace API.Services
{
    public enum TaskUpdateError
    {
        None,
        NotFound,
        InvalidAssignee,
    }

    public record TaskUpdateResult(TaskResponseDto? Task, TaskUpdateError Error);
}
