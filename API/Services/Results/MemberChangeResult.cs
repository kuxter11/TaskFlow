using API.Dtos.Project;

namespace API.Services.Results
{
    public enum MemberChangeError
    {
        None,
        NotFound,
        Forbidden,
        UserNotFound,
        AlreadyMember,
        NotAMember,
        CannotRemoveCreator,
    }

    public record AddMemberResult(ProjectMemberDto? Member, MemberChangeError Error);

    public record CandidatesResult(List<ProjectMemberDto> Users, MemberChangeError Error);
}
