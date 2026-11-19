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
                select new ProjectMemberDto
                {
                    UserId = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                }
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

        public async Task<bool> IsCreatorAsync(int projectId, Guid userId)
        {
            return await context.Projects.AnyAsync(p => p.Id == projectId && p.CreatedBy == userId);
        }

        public async Task<ProjectMemberDto?> AddMemberAsync(int projectId, Guid userId)
        {
            var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null)
                return null;

            context.ProjectMembers.Add(
                new ProjectMember { ProjectId = projectId, UserId = userId }
            );
            await context.SaveChangesAsync();

            return new ProjectMemberDto
            {
                UserId = user.Id,
                Username = user.Username,
                Email = user.Email,
            };
        }

        public async Task<bool> RemoveMemberAsync(int projectId, Guid userId)
        {
            var member = await context.ProjectMembers.FirstOrDefaultAsync(m =>
                m.ProjectId == projectId && m.UserId == userId
            );
            if (member is null)
                return false;

            await using var transaction = await context.Database.BeginTransactionAsync();

            await context
                .ProjectTasks.Where(t => t.ProjectId == projectId && t.AssigneeId == userId)
                .ExecuteUpdateAsync(s => s.SetProperty(t => t.AssigneeId, (Guid?)null));

            context.ProjectMembers.Remove(member);
            await context.SaveChangesAsync();

            await transaction.CommitAsync();
            return true;
        }

        public async Task<List<ProjectMemberDto>> SearchCandidatesAsync(
            int projectId,
            string query,
            int take
        )
        {
            return await context
                .Users.AsNoTracking()
                .Where(u => u.Username.Contains(query) || u.Email.Contains(query))
                .Where(u =>
                    !context.ProjectMembers.Any(m => m.ProjectId == projectId && m.UserId == u.Id)
                )
                .OrderBy(u => u.Username)
                .Take(take)
                .Select(u => new ProjectMemberDto
                {
                    UserId = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                })
                .ToListAsync();
        }
    }
}
