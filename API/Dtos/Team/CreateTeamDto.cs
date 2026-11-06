using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Team
{
    public class CreateTeamDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [Required]
        public Guid CreatedBy { get; set; }
        public bool OwnerAsMember { get; set; } = true;
        //public List<TeamMemberDto> Members { get; set; } = new List<TeamMemberDto>();
    }
}
