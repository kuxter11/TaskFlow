using API.Data;
using API.Entities;
using API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class TeamRepository(AppDbContext context) : ITeamRepository
    {
        public async Task<Team?> GetTeamByIdAsync(int id)
        {
            return await context.Teams.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task AddAsync(Team team)
        {
            await context.Teams.AddAsync(team);
            await context.SaveChangesAsync();
        }

        public async Task<List<Team>> GetAllAsync()
        {
            return await context.Teams.ToListAsync();
        }
    }
}
