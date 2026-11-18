using API.Data;
using API.Dtos.Project;
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

        public async Task<List<ProjectMemberDto>> GetMembersAsync(int projectId)
        {
            return await (
                from m in context.ProjectMembers
                join u in context.Users on m.UserId equals u.Id
                where m.ProjectId == projectId
                orderby u.Username
                select new ProjectMemberDto { UserId = u.Id, Username = u.Username }
            )
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<bool> IsMemberAsync(int projectId, Guid userId)
        {
            return await context.ProjectMembers.AnyAsync(m =>
                m.ProjectId == projectId && m.UserId == userId
            );
        }

        public async Task<bool> ExistsAsync(int projectId)
        {
            return await context.Projects.AnyAsync(p => p.Id == projectId);
        }
    }
}
