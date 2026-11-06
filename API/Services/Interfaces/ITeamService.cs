using API.Dtos.Team;
using API.Entities;

namespace API.Services.Interfaces
{
    public interface ITeamService
    {
        Task<TeamResponseDto> CreateTeamAsync(CreateTeamDto dto);
        Task<TeamResponseDto> GetTeamByIdAsync(int id);
        Task<List<TeamResponseDto>> GetAllTeamsAsync();
    }
}
