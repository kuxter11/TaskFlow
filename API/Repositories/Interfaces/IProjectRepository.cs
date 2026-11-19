using API.Dtos.Project;
using API.Entities;

namespace API.Repositories.Interfaces
{
    public interface IProjectRepository
    {
        Task AddAsync(Project project);
        Task<List<Project>> GetProjectsByUserIdAsync(Guid userId);
        Task<Project?> GetByIdAsync(int id);
        Task<List<Project>> GetAllAsync();
        Task<List<ProjectMemberDto>> GetMembersAsync(int projectId);
        Task<bool> IsMemberAsync(int projectId, Guid userId);
        Task<bool> ExistsAsync(int projectId);
        Task<bool> IsCreatorAsync(int projectId, Guid userId);
        Task<ProjectMemberDto?> AddMemberAsync(int projectId, Guid userId);
        Task<bool> RemoveMemberAsync(int projectId, Guid userId);
        Task<List<ProjectMemberDto>> SearchCandidatesAsync(int projectId, string query, int take);
    }
}
