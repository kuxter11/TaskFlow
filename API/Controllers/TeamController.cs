using API.Constants;
using API.Dtos.Team;
using API.Enums;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TeamController(ITeamService teamService) : ControllerBase
    {
        [HttpPost("create")]
        //[Authorize(Roles = UserRolesNames.ProjectManager)]
        public async Task<ActionResult<TeamResponseDto>> CreateTeam(CreateTeamDto dto)
        {
            var result = await teamService.CreateTeamAsync(dto);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TeamResponseDto>> GetTeam(int id)
        {
            var team = await teamService.GetTeamByIdAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }
    }
}
