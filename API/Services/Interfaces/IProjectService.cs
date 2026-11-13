using API.Dtos.Project;

namespace API.Services.Interfaces
{
    public interface IProjectService
    {
        Task<ProjectResponseDto> CreateProjectAsync(CreateProjectDto projectDto, Guid userId);
        Task<List<ProjectResponseDto>> GetProjectsAsync(Guid userId, bool isAdmin);

        Task<ProjectResponseDto?> GetProjectByIdAsync(int id, Guid userId, bool isAdmin);
    }
}
