using API.Dtos.Task;

namespace API.Services.Results
{
    public enum TaskUpdateError
    {
        None,
        NotFound,
        InvalidAssignee,
    }

    public record TaskUpdateResult(TaskResponseDto? Task, TaskUpdateError Error);
}
