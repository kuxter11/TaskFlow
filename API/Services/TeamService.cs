using API.Dtos.Team;
using API.Entities;
using API.Enums;
using API.Repositories.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
    public class TeamService(ITeamRepository teamRepository) : ITeamService
    {
        public async Task<TeamResponseDto> CreateTeamAsync(CreateTeamDto dto)
        {
            var team = new Team
            {
                Name = dto.Name,
                Description = dto.Description,
                CreatedBy = dto.CreatedBy,
            };

            if (dto.OwnerAsMember)
            {
                var teamMember = new TeamMember { UserId = dto.CreatedBy, Role = TeamRole.Owner };
                team.Members.Add(teamMember);
            }

            await teamRepository.AddAsync(team);
            return new TeamResponseDto
            {
                Id = team.Id,
                Name = team.Name,
                Description = team.Description,
            };
        }

        public async Task<TeamResponseDto> GetTeamByIdAsync(int id)
        {
            var team = await teamRepository.GetTeamByIdAsync(id);

            return new TeamResponseDto
            {
                Id = team.Id,
                Name = team.Name,
                Description = team.Description,
                Members = team
                    .Members.Select(m => new TeamMemberDto
                    {
                        Id = m.UserId,
                        Role = m.Role,
                        JoinedAt = m.JoinedAt,
                    })
                    .ToList(),
            };
        }

        public async Task<List<TeamResponseDto>> GetAllTeamsAsync()
        {
            var teams = await teamRepository.GetAllAsync();
            return teams
                .Select(team => new TeamResponseDto
                {
                    Id = team.Id,
                    Name = team.Name,
                    Description = team.Description,
                    Members = team
                        .Members.Select(m => new TeamMemberDto
                        {
                            Id = m.UserId,
                            Role = m.Role,
                            JoinedAt = m.JoinedAt,
                        })
                        .ToList(),
                })
                .ToList();
        }
    }
}
