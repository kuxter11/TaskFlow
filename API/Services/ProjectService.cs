using API.Dtos.Project;
using API.Entities;
using API.Enums;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using API.Services.Results;

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

        public async Task<bool> CanAccessAsync(int projectId, Guid userId, bool isAdmin)
        {
            return isAdmin
                ? await projectRepository.ExistsAsync(projectId)
                : await projectRepository.IsMemberAsync(projectId, userId);
        }

        public async Task<List<ProjectMemberDto>?> GetMembersAsync(
            int projectId,
            Guid userId,
            bool isAdmin
        )
        {
            if (!await CanAccessAsync(projectId, userId, isAdmin))
                return null;

            return await projectRepository.GetMembersAsync(projectId);
        }

        private async Task<MemberChangeError> CheckCanManageAsync(
            int projectId,
            Guid userId,
            UserRole role
        )
        {
            if (!await CanAccessAsync(projectId, userId, role == UserRole.Admin))
                return MemberChangeError.NotFound;

            if (role is UserRole.Admin or UserRole.ProjectManager)
                return MemberChangeError.None;

            return await projectRepository.IsCreatorAsync(projectId, userId)
                ? MemberChangeError.None
                : MemberChangeError.Forbidden;
        }

        public async Task<AddMemberResult> AddMemberAsync(
            int projectId,
            AddMemberDto dto,
            Guid userId,
            UserRole role
        )
        {
            var check = await CheckCanManageAsync(projectId, userId, role);
            if (check != MemberChangeError.None)
                return new(null, check);

            if (await projectRepository.IsMemberAsync(projectId, dto.UserId))
                return new(null, MemberChangeError.AlreadyMember);

            var member = await projectRepository.AddMemberAsync(projectId, dto.UserId);

            return member is null
                ? new(null, MemberChangeError.UserNotFound)
                : new(member, MemberChangeError.None);
        }

        public async Task<MemberChangeError> RemoveMemberAsync(
            int projectId,
            Guid memberId,
            Guid userId,
            UserRole role
        )
        {
            var check = await CheckCanManageAsync(projectId, userId, role);
            if (check != MemberChangeError.None)
                return check;

            if (await projectRepository.IsCreatorAsync(projectId, memberId))
                return MemberChangeError.CannotRemoveCreator;

            return await projectRepository.RemoveMemberAsync(projectId, memberId)
                ? MemberChangeError.None
                : MemberChangeError.NotAMember;
        }

        public async Task<CandidatesResult> SearchCandidatesAsync(
            int projectId,
            string query,
            Guid userId,
            UserRole role
        )
        {
            var check = await CheckCanManageAsync(projectId, userId, role);
            if (check != MemberChangeError.None)
                return new([], check);

            query = query.Trim();
            if (query.Length < 2)
                return new([], MemberChangeError.None);

            // Organizations: when they exist, restrict this search to the caller's organization.
            var users = await projectRepository.SearchCandidatesAsync(projectId, query, 10);

            return new(users, MemberChangeError.None);
        }
    }
}
