namespace API.Dtos.Project
{
    public class ProjectMemberDto
    {
        public Guid UserId { get; set; }
        public string Username { get; set; } = string.Empty;
    }
}
