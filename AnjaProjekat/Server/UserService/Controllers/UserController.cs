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

        [HttpPost("register")]
        public async Task<IActionResult> register([FromBody]RegisterDTO registerDTO)
        {
            Boolean boolean= await _userService.register(registerDTO);
            return Ok(boolean);
        }

        [HttpGet("home")]
        [Authorize]
        public string home(LoginAttemptDTO loginDTO)
        {
            return "Hello world";
        }
    }
}