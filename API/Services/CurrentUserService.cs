using System.Security.Claims;
using API.Enums;
using API.Services.Interfaces;

namespace API.Services
{
    public class CurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService
    {
        private ClaimsPrincipal User =>
            httpContextAccessor.HttpContext?.User
            ?? throw new InvalidOperationException("No HttpContext available.");

        public Guid UserId
        {
            get
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (!Guid.TryParse(userId, out var parsedUserId))
                {
                    throw new UnauthorizedAccessException("Invalid user ID in token.");
                }
                return parsedUserId;
            }
        }

        public UserRole Role
        {
            get
            {
                var role = User.FindFirstValue(ClaimTypes.Role);
                if (!Enum.TryParse<UserRole>(role, out var parsedRole))
                {
                    throw new UnauthorizedAccessException("Invalid user role in token.");
                }
                return parsedRole;
            }
        }

        public bool IsAdmin => Role == UserRole.Admin;
    }
}
