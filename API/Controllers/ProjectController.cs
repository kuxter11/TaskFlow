using API.Dtos.Project;
using API.Services.Interfaces;
using API.Services.Results;
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

        [HttpGet("{id:int}/members")]
        public async Task<ActionResult<List<ProjectMemberDto>>> GetMembers(int id)
        {
            var members = await projectService.GetMembersAsync(
                id,
                currentUser.UserId,
                currentUser.IsAdmin
            );

            return members is null ? NotFound() : Ok(members);
        }

        [HttpPost("{id:int}/members")]
        public async Task<ActionResult<ProjectMemberDto>> AddMember(int id, AddMemberDto dto)
        {
            var result = await projectService.AddMemberAsync(
                id,
                dto,
                currentUser.UserId,
                currentUser.Role
            );

            return result.Error switch
            {
                MemberChangeError.None => Ok(result.Member),
                MemberChangeError.NotFound => NotFound(),
                MemberChangeError.Forbidden => StatusCode(403),
                MemberChangeError.AlreadyMember => Conflict(
                    new { message = "User is already a member." }
                ),
                _ => BadRequest(new { message = "User not found." }),
            };
        }

        [HttpDelete("{id:int}/members/{memberId:guid}")]
        public async Task<IActionResult> RemoveMember(int id, Guid memberId)
        {
            var error = await projectService.RemoveMemberAsync(
                id,
                memberId,
                currentUser.UserId,
                currentUser.Role
            );

            return error switch
            {
                MemberChangeError.None => NoContent(),
                MemberChangeError.NotFound or MemberChangeError.NotAMember => NotFound(),
                MemberChangeError.Forbidden => StatusCode(403),
                _ => BadRequest(new { message = "The project creator can't be removed." }),
            };
        }

        [HttpGet("{id:int}/members/candidates")]
        public async Task<ActionResult<List<ProjectMemberDto>>> SearchCandidates(
            int id,
            [FromQuery] string q = ""
        )
        {
            var result = await projectService.SearchCandidatesAsync(
                id,
                q,
                currentUser.UserId,
                currentUser.Role
            );

            return result.Error switch
            {
                MemberChangeError.None => Ok(result.Users),
                MemberChangeError.NotFound => NotFound(),
                _ => StatusCode(403),
            };
        }
    }
}
