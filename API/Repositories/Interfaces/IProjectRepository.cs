using API.Entities;

namespace API.Repositories.Interfaces
{
    public interface IProjectRepository
    {
        Task AddAsync(Project project);
        Task<Project?> GetByIdAsync(int id);
        Task<List<Project>> GetAllAsync();
    }
}
