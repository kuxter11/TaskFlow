using API.Enums;

namespace API.Services.Interfaces
{
    public interface ICurrentUserService
    {
        Guid UserId { get; }
        UserRole Role { get; }
        bool IsAdmin { get; }
    }
}
