using API.Dtos.Auth;
using API.Dtos.Auth.Response;
using API.Entities;
using API.Enums;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService, ITokenService tokenService)
        : ControllerBase
    {
        private const string RefreshTokenCookieName = "refreshToken";

        private CookieOptions GetRefreshTokenCookieOptions()
        {
            return new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Path = "/api/auth",
                Expires = DateTime.UtcNow.AddDays(7),
            };
        }

        private void SetRefreshTokenCookie(string refreshToken)
        {
            Response.Cookies.Append(
                RefreshTokenCookieName,
                refreshToken,
                GetRefreshTokenCookieOptions()
            );
        }

        private void ClearRefreshTokenCookie()
        {
            Response.Cookies.Delete(RefreshTokenCookieName, GetRefreshTokenCookieOptions());
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserResponseDto>> Register(RegisterUserDto dto)
        {
            var result = await authService.RegisterAsync(dto);

            if (result is null)
            {
                return BadRequest("User already exists.");
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginUserDto dto)
        {
            var result = await authService.LoginAsync(dto);

            if (result is null)
            {
                return Unauthorized("Invalid username or password.");
            }

            SetRefreshTokenCookie(result.RefreshToken);

            return Ok(new AuthResponseDto { AccessToken = result.AccessToken, User = result.User });
        }

        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            if (
                Request.Cookies.TryGetValue(RefreshTokenCookieName, out var refreshToken)
                && !string.IsNullOrWhiteSpace(refreshToken)
            )
            {
                await tokenService.RevokeRefreshTokenAsync(refreshToken);
            }

            ClearRefreshTokenCookie();

            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<ActionResult<AuthResponseDto>> RefreshToken()
        {
            if (
                !Request.Cookies.TryGetValue(RefreshTokenCookieName, out var refreshToken)
                || string.IsNullOrWhiteSpace(refreshToken)
            )
            {
                ClearRefreshTokenCookie();
                return Unauthorized("Refresh token is missing.");
            }

            var result = await tokenService.RefreshTokenAsync(refreshToken);

            if (result is null)
            {
                ClearRefreshTokenCookie();
                return Unauthorized("Invalid or expired refresh token.");
            }

            SetRefreshTokenCookie(result.RefreshToken);

            return Ok(new AuthResponseDto { AccessToken = result.AccessToken, User = result.User });
        }

        [Authorize]
        [HttpGet]
        public IActionResult AuthentificatedOnlyEndpoint()
        {
            return Ok("You are authenticated!");
        }

        [Authorize(Roles = nameof(UserRole.Admin))]
        [HttpGet("admin-only")]
        public IActionResult AdminOnlyEndpoint()
        {
            return Ok("You are admin!");
        }
    }
}
