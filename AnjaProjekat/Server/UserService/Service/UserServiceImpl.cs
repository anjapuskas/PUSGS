using AutoMapper;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserService.Data;
using UserService.DTO;
using UserService.Exceptions;
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


            if (!BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
            {
                throw new CredentialsException("Incorrect login credentials!");
            }
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

        public async Task<bool> register(RegisterDTO registerDTO)
        {
            User user = _mapper.Map<User>(registerDTO);

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            return true;

        }

        public async Task<bool> updateProfile(ProfileDTO profileDTO)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Id == profileDTO.Id);
            user.FirstName = profileDTO.FirstName;
            user.LastName = profileDTO.LastName;
            user.Address = profileDTO.Address;
            user.DateOfBirth = profileDTO.DateOfBirth;
            //user.Image= resolveImage(user.Image, profileDTO.Image, user.Username);
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
            return true;
        }

        private string resolveImage (string oldImage, IFormFile newImage, string username)
        {


            if (oldImage != null)
            {
                if (File.Exists(oldImage))
                {
                    File.Delete(oldImage);
                }
            }

            string imagePath = "C:\\Images\\Users";
            
            string imageName = username + Path.GetExtension(newImage.FileName);
            imagePath = Path.Combine(imagePath, imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create, FileAccess.Write))
            {
                newImage.CopyToAsync(fileStream);
            }

            return imagePath;
        }

        public async Task<ProfileImageDTO> getProfileImage(long id)
        {
            User user = _dbContext.Users.Find(id);
            FileStream fileStream = null;
            if (File.Exists(user.Image))
            {
                fileStream = new FileStream(user.Image, FileMode.Open, FileAccess.Read);
            }

            if (fileStream == null) { return null; }

            ProfileImageDTO profileImageDTO = new ProfileImageDTO();
            profileImageDTO.Name = user.Username + ".jpg";
            profileImageDTO.File = fileStream; ;
            return profileImageDTO;
        }
    }
}
