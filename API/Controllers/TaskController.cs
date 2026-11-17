using API.Dtos.Task;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/Project/{projectId:int}/tasks")]
    [ApiController]
    [Authorize]
    public class TaskController(ITaskService taskService, ICurrentUserService currentUser)
        : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<TaskResponseDto>>> GetTasks(int projectId)
        {
            var tasks = await taskService.GetTasksAsync(
                projectId,
                currentUser.UserId,
                currentUser.IsAdmin
            );

            return tasks is null ? NotFound() : Ok(tasks);
        }

        [HttpPost]
        public async Task<ActionResult<TaskResponseDto>> CreateTask(
            int projectId,
            CreateTaskDto dto
        )
        {
            var task = await taskService.CreateTaskAsync(
                projectId,
                dto,
                currentUser.UserId,
                currentUser.IsAdmin
            );

            return task is null ? NotFound() : Ok(task);
        }

        [HttpPatch("{taskId:int}/status")]
        public async Task<ActionResult<TaskResponseDto>> UpdateStatus(
            int projectId,
            int taskId,
            UpdateTaskStatusDto dto
        )
        {
            var task = await taskService.UpdateStatusAsync(
                projectId,
                taskId,
                dto,
                currentUser.UserId,
                currentUser.IsAdmin
            );

            return task is null ? NotFound() : Ok(task);
        }

        [HttpPut("{taskId:int}")]
        public async Task<ActionResult<TaskResponseDto>> UpdateTask(
            int projectId,
            int taskId,
            UpdateTaskDto dto
        )
        {
            var task = await taskService.UpdateTaskAsync(
                projectId,
                taskId,
                dto,
                currentUser.UserId,
                currentUser.IsAdmin
            );

            return task is null ? NotFound() : Ok(task);
        }
    }
}
