using API.Dtos.Task;
using API.Entities;
using API.Repositories.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
    public class TaskService(ITaskRepository taskRepository, IProjectRepository projectRepository)
        : ITaskService
    {
        private async Task<bool> CanAccessProjectAsync(int projectId, Guid userId, bool isAdmin)
        {
            return isAdmin
                ? await projectRepository.ExistsAsync(projectId)
                : await projectRepository.IsMemberAsync(projectId, userId);
        }

        public async Task<List<TaskResponseDto>?> GetTasksAsync(
            int projectId,
            Guid userId,
            bool isAdmin
        )
        {
            if (!await CanAccessProjectAsync(projectId, userId, isAdmin))
                return null;

            var tasks = await taskRepository.GetByProjectIdAsync(projectId);
            return tasks.Select(ToDto).ToList();
        }

        public async Task<TaskResponseDto?> CreateTaskAsync(
            int projectId,
            CreateTaskDto dto,
            Guid userId,
            bool isAdmin
        )
        {
            if (!await CanAccessProjectAsync(projectId, userId, isAdmin))
                return null;

            var task = new ProjectTask
            {
                ProjectId = projectId,
                Title = dto.Title.Trim(),
                Description = dto.Description?.Trim() ?? string.Empty,
                CreatedBy = userId,
            };

            await taskRepository.AddAsync(task);
            return ToDto(task);
        }

        public async Task<TaskResponseDto?> UpdateStatusAsync(
            int projectId,
            int taskId,
            UpdateTaskStatusDto dto,
            Guid userId,
            bool isAdmin
        )
        {
            if (!await CanAccessProjectAsync(projectId, userId, isAdmin))
                return null;

            var task = await taskRepository.GetByIdAsync(projectId, taskId);
            if (task is null)
                return null;

            task.Status = dto.Status;
            await taskRepository.SaveChangesAsync();

            return ToDto(task);
        }

        public async Task<TaskResponseDto?> UpdateTaskAsync(
            int projectId,
            int taskId,
            UpdateTaskDto dto,
            Guid userId,
            bool isAdmin
        )
        {
            if (!await CanAccessProjectAsync(projectId, userId, isAdmin))
                return null;

            var task = await taskRepository.GetByIdAsync(projectId, taskId);
            if (task is null)
                return null;

            task.Title = dto.Title.Trim();
            task.Description = dto.Description?.Trim() ?? string.Empty;
            task.Status = dto.Status;

            await taskRepository.SaveChangesAsync();

            return ToDto(task);
        }

        private static TaskResponseDto ToDto(ProjectTask t) =>
            new()
            {
                Id = t.Id,
                ProjectId = t.ProjectId,
                Title = t.Title,
                Description = t.Description,
                Status = t.Status,
                CreatedBy = t.CreatedBy,
                CreatedAt = t.CreatedAt,
            };
    }
}
