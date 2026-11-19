using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Project
{
    public class AddMemberDto
    {
        [Required]
        public Guid UserId { get; set; }
    }
}
