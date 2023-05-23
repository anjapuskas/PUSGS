using AutoMapper;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserService.Data;
using UserService.DTO;
using UserService.Model;
using UserService.Service.Interface;

namespace UserService.Service
{
    public class UserServiceImpl : IUserService
    {

        private readonly IMapper _mapper;
        private readonly EShopDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserServiceImpl(IMapper mapper, EShopDbContext dbContext, IConfiguration configuration)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _configuration = configuration; 
        }

        public async Task<LoginResultDTO> login(LoginAttemptDTO login)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Username == login.Username);

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.UserRole.ToString())
            };

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("ApplicationSettings")["secret"]));

            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:44350/", 
                claims: claims, 
                expires: DateTime.Now.AddMinutes(20), 
                signingCredentials: signinCredentials 
            );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            LoginResultDTO loginResult = _mapper.Map<LoginResultDTO>(user);
            loginResult.Token = token;

            return loginResult;

        }
    }
}
