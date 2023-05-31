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

        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> profile([FromForm]ProfileDTO profileDTO)
        {
            Boolean boolean = await _userService.updateProfile(profileDTO);
            return (Ok(boolean));
        }

        [Authorize]
        [HttpGet("profile/image/{id}")]
        public async Task<IActionResult> profileImage(long id)
        {
            ProfileImageDTO file = await _userService.getProfileImage(id);
            return File(file.File, "application/octet-stream", file.Name);
        }
    }
}