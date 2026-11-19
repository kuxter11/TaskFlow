using API.Dtos.Task;
using API.Entities;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using API.Services.Results;

namespace API.Services
{
    public class TaskService(ITaskRepository taskRepository, IProjectService projectService)
        : ITaskService
    {
        public async Task<List<TaskResponseDto>?> GetTasksAsync(
            int projectId,
            Guid userId,
            bool isAdmin
        )
        {
            if (!await projectService.CanAccessAsync(projectId, userId, isAdmin))
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
            if (!await projectService.CanAccessAsync(projectId, userId, isAdmin))
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
            if (!await projectService.CanAccessAsync(projectId, userId, isAdmin))
                return null;

            var task = await taskRepository.GetByIdAsync(projectId, taskId);
            if (task is null)
                return null;

            task.Status = dto.Status;
            await taskRepository.SaveChangesAsync();

            return ToDto(task);
        }

        public async Task<TaskUpdateResult> UpdateTaskAsync(
            int projectId,
            int taskId,
            UpdateTaskDto dto,
            Guid userId,
            bool isAdmin
        )
        {
            if (!await projectService.CanAccessAsync(projectId, userId, isAdmin))
                return new TaskUpdateResult(null, TaskUpdateError.NotFound);

            var task = await taskRepository.GetByIdAsync(projectId, taskId);
            if (task is null)
                return new TaskUpdateResult(null, TaskUpdateError.NotFound);

            if (
                dto.AssigneeId is Guid asigneeId
                && asigneeId != task.AssigneeId
                && !await projectService.CanAccessAsync(projectId, asigneeId, isAdmin)
            )
                return new TaskUpdateResult(null, TaskUpdateError.InvalidAssignee);

            task.Title = dto.Title.Trim();
            task.Description = dto.Description?.Trim() ?? string.Empty;
            task.Status = dto.Status;
            task.AssigneeId = dto.AssigneeId;

            await taskRepository.SaveChangesAsync();

            return new TaskUpdateResult(ToDto(task), TaskUpdateError.None);
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
                AssigneeId = t.AssigneeId,
            };
    }
}
