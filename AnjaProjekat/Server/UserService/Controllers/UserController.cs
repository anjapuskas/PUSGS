using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserService.DTO;
using UserService.Service.Interface;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> login(LoginAttemptDTO loginDTO)
        {
            LoginResultDTO loginResult = await _userService.login(loginDTO);
            return Ok(loginResult);
        }

        [HttpGet("home")]
        [Authorize]
        public string home(LoginAttemptDTO loginDTO)
        {
            return "Hello world";
        }
    }
}