using API.Entities;

namespace API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task AddAsync(User user);
        Task<User?> GetByRefreshTokenAsync(string refreshToken);
        Task SaveChangesAsync();
    }
}
