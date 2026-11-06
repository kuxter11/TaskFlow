namespace API.Dtos.Team
{
    public class TeamResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<TeamMemberDto> Members { get; set; } = new List<TeamMemberDto>();
    }
}
