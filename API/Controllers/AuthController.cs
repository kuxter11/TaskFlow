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
        [HttpPost("register")]
        public async Task<ActionResult<RegisterUserResponseDto>> Register(RegisterUserDto dto)
        {
            var registeredUser = await authService.RegisterAsync(dto);

            if (registeredUser is null)
            {
                return BadRequest("User already exists.");
            }

            return Ok(registeredUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseDto>> Login(LoginUserDto dto)
        {
            var result = await authService.LoginAsync(dto);

            if (result is null)
            {
                return BadRequest("Invalid username or password.");
            }

            return Ok(result);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto dto)
        {
            var result = await tokenService.RefreshTokenAsync(dto);

            if (result is null || result.AccessToken is null || result.RefreshToken is null)
            {
                return Unauthorized("Invalid refresh token.");
            }

            return Ok(result);
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
