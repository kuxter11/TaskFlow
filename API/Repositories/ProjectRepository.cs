using API.Data;
using API.Entities;
using API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ProjectRepository(AppDbContext context) : IProjectRepository
    {
        public async Task<Project?> GetByIdAsync(int id)
        {
            return await context
                .Projects.Include(p => p.Members)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(Project project)
        {
            await context.Projects.AddAsync(project);
            await context.SaveChangesAsync();
        }

        public async Task<List<Project>> GetProjectsByUserIdAsync(Guid userId)
        {
            return await context
                .Projects.Where(p => p.Members.Any(m => m.UserId == userId))
                .ToListAsync();
        }

        public async Task<List<Project>> GetAllAsync()
        {
            return await context.Projects.ToListAsync();
        }
    }
}
