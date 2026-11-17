using API.Entities;

namespace API.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task<List<ProjectTask>> GetByProjectIdAsync(int projectId);
        Task<ProjectTask?> GetByIdAsync(int projectId, int taskId);
        Task AddAsync(ProjectTask task);
        Task SaveChangesAsync();
    }
}
