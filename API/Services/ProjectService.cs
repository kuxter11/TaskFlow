using API.Dtos.Project;
using API.Entities;
using API.Repositories.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
    public class ProjectService(IProjectRepository projectRepository) : IProjectService
    {
        public async Task<ProjectResponseDto> CreateProjectAsync(
            CreateProjectDto projectDto,
            Guid userId
        )
        {
            var project = new Project
            {
                Name = projectDto.Name,
                Description = projectDto.Description ?? string.Empty,
                CreatedBy = userId,
                CreatedAt = DateTime.UtcNow,
            };
            project.Members.Add(new ProjectMember { UserId = userId, JoinedAt = DateTime.UtcNow });

            await projectRepository.AddAsync(project);

            return new ProjectResponseDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                CreatedBy = project.CreatedBy,
                CreatedAt = project.CreatedAt,
            };
        }

        public async Task<List<ProjectResponseDto>> GetProjectsAsync(Guid userId, bool isAdmin)
        {
            var projects = isAdmin
                ? await projectRepository.GetAllAsync()
                : await projectRepository.GetProjectsByUserIdAsync(userId);

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

        public async Task<ProjectResponseDto?> GetProjectByIdAsync(
            int id,
            Guid userId,
            bool isAdmin
        )
        {
            var project = await projectRepository.GetByIdAsync(id);

            if (project == null)
                return null;

            // Admins can access every project.
            // Other users must be project members.
            if (!isAdmin && !project.Members.Any(m => m.UserId == userId))
            {
                return null;
            }

            return new ProjectResponseDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                CreatedBy = project.CreatedBy,
                CreatedAt = project.CreatedAt,
            };
        }
    }
}
