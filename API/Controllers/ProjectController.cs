using API.Dtos.Project;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectController(IProjectService projectService, ICurrentUserService currentUser)
        : ControllerBase
    {
        [HttpPost("create")]
        [Authorize(Roles = "ProjectManager,Admin")]
        public async Task<ActionResult<ProjectResponseDto>> CreateProject(CreateProjectDto dto)
        {
            var result = await projectService.CreateProjectAsync(dto, currentUser.UserId);

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProjectResponseDto>> GetProjectById(int id)
        {
            var project = await projectService.GetProjectByIdAsync(
                id,
                currentUser.UserId,
                currentUser.IsAdmin
            );

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpGet]
        public async Task<ActionResult<List<ProjectResponseDto>>> GetProjects()
        {
            var projects = await projectService.GetProjectsAsync(
                currentUser.UserId,
                currentUser.IsAdmin
            );

            return Ok(projects);
        }
    }
}
