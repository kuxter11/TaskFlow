using API.Dtos.Project;
using API.Enums;
using API.Services.Results;

namespace API.Services.Interfaces
{
    public interface IProjectService
    {
        Task<ProjectResponseDto> CreateProjectAsync(CreateProjectDto projectDto, Guid userId);
        Task<List<ProjectResponseDto>> GetProjectsAsync(Guid userId, bool isAdmin);

        Task<ProjectResponseDto?> GetProjectByIdAsync(int id, Guid userId, bool isAdmin);
        Task<bool> CanAccessAsync(int projectId, Guid userId, bool isAdmin);
        Task<List<ProjectMemberDto>?> GetMembersAsync(int projectId, Guid userId, bool isAdmin);
        Task<AddMemberResult> AddMemberAsync(
            int projectId,
            AddMemberDto dto,
            Guid userId,
            UserRole role
        );
        Task<MemberChangeError> RemoveMemberAsync(
            int projectId,
            Guid memberId,
            Guid userId,
            UserRole role
        );

        Task<CandidatesResult> SearchCandidatesAsync(
            int projectId,
            string query,
            Guid userId,
            UserRole role
        );
    }
}
