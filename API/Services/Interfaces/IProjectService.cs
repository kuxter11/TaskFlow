using API.Dtos.Project;

namespace API.Services.Interfaces
{
    public interface IProjectService
    {
        Task<ProjectResponseDto> CreateProjectAsync(CreateProjectDto projectDto);
        Task<ProjectResponseDto> GetProjectByIdAsync(int id);
        Task<List<ProjectResponseDto>> GetAllProjectsAsync();
    }
}
