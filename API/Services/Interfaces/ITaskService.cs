using API.Dtos.Task;

namespace API.Services.Interfaces
{
    public interface ITaskService
    {
        Task<List<TaskResponseDto>?> GetTasksAsync(int projectId, Guid userId, bool isAdmin);
        Task<TaskResponseDto?> CreateTaskAsync(
            int projectId,
            CreateTaskDto dto,
            Guid userId,
            bool isAdmin
        );
        Task<TaskResponseDto?> UpdateStatusAsync(
            int projectId,
            int taskId,
            UpdateTaskStatusDto dto,
            Guid userId,
            bool isAdmin
        );
        Task<TaskUpdateResult> UpdateTaskAsync(
            int projectId,
            int taskId,
            UpdateTaskDto dto,
            Guid userId,
            bool isAdmin
        );
    }
}
