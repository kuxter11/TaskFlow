using API.Data;
using API.Entities;
using API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class TaskRepository(AppDbContext context) : ITaskRepository
    {
        public async Task<List<ProjectTask>> GetByProjectIdAsync(int projectId)
        {
            return await context
                .ProjectTasks.AsNoTracking()
                .Where(t => t.ProjectId == projectId)
                .OrderBy(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<ProjectTask?> GetByIdAsync(int projectId, int taskId)
        {
            return await context.ProjectTasks.FirstOrDefaultAsync(t =>
                t.Id == taskId && t.ProjectId == projectId
            );
        }

        public async Task AddAsync(ProjectTask task)
        {
            await context.ProjectTasks.AddAsync(task);
            await context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
