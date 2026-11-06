using API.Entities;

namespace API.Repositories.Interfaces
{
    public interface ITeamRepository
    {
        Task AddAsync(Team team);
        Task<Team?> GetTeamByIdAsync(int id);

        Task<List<Team>> GetAllAsync();
    }
}
