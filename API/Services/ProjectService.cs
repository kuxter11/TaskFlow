using API.Dtos.Project;
using API.Entities;
using API.Repositories.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
    public class ProjectService(IProjectRepository projectRepository) : IProjectService
    {
        public async Task<ProjectResponseDto> CreateProjectAsync(CreateProjectDto projectDto)
        {
            var project = new Project
            {
                Name = projectDto.Name,
                Description = projectDto.Description,
                CreatedBy = projectDto.CreatedBy,
                CreatedAt = DateTime.UtcNow,
            };
            await projectRepository.AddAsync(project);
            return new ProjectResponseDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
            };
        }

        public async Task<ProjectResponseDto> GetProjectByIdAsync(int id)
        {
            var project = await projectRepository.GetByIdAsync(id);
            if (project == null)
            {
                throw new Exception("Project not found");
            }
            return new ProjectResponseDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
            };
        }

        public async Task<List<ProjectResponseDto>> GetAllProjectsAsync()
        {
            var projects = await projectRepository.GetAllAsync();
            return projects
                .Select(p => new ProjectResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    CreatedBy = p.CreatedBy,
                    CreatedAt = p.CreatedAt,
                })
                .ToList();
        }
    }
}
