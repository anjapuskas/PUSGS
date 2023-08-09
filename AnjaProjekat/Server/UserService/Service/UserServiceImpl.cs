using AutoMapper;
using Google.Apis.Auth;
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
        private readonly IRepository _repository;
        private readonly IConfiguration _configuration;

        public UserServiceImpl(IMapper mapper, IRepository repository, IConfiguration configuration)
        {
            _mapper = mapper;
            _repository = repository;
            _configuration = configuration; 
        }

        public async Task<LoginResultDTO> login(LoginAttemptDTO login)
        {
            var users = await _repository._userRepository.GetAll();
            User? user = users.FirstOrDefault(u => u.Username == login.Username);


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
            loginResult.UserStatus = Enum.GetName(typeof(UserStatus), user.UserStatus);

            return loginResult;

        }

        public async Task<LoginResultDTO> googleLogin(GoogleLoginAttemptDTO login)
        {

            var validiran = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { "992296743500-b03369t6d0irjg28vf57ug80unsntiid.apps.googleusercontent.com" }
            };

            var googleInfo = await GoogleJsonWebSignature.ValidateAsync(login.Token, validiran);



            var users = await _repository._userRepository.GetAll();
            User? user = users.FirstOrDefault(u => u.Email == googleInfo.Email);

            if (user == null)
            {
                User newUser = new User();
                newUser.Email = googleInfo.Email;
                newUser.FirstName = googleInfo.GivenName;
                newUser.LastName = googleInfo.FamilyName;
                newUser.Username = googleInfo.Email.Split("@")[0];
                newUser.Address = "";
                newUser.Password = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString("n").Substring(0, 8));
                newUser.DateOfBirth = DateTime.MinValue;
                newUser.UserRole = UserRole.BUYER;
                newUser.UserStatus = UserStatus.VERIFIED;

                await _repository._userRepository.Insert(newUser);
                await _repository.SaveChanges();

                user = newUser;
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
            loginResult.UserStatus = Enum.GetName(typeof(UserStatus), user.UserStatus);

            return loginResult;

        }

        public async Task<bool> register(RegisterDTO registerDTO)
        {
            User user = _mapper.Map<User>(registerDTO);

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            if(user.UserRole == UserRole.SELLER)
            {
                user.UserStatus = UserStatus.ON_HOLD;
            } else
            {
                user.UserStatus = UserStatus.VERIFIED;
            }

            await _repository._userRepository.Insert(user);
            await _repository.SaveChanges();

            return true;

        }

        public async Task<bool> updateProfile(ProfileDTO profileDTO)
        {
            User user = await _repository._userRepository.Get(profileDTO.Id);
            user.FirstName = profileDTO.FirstName;
            user.LastName = profileDTO.LastName;
            user.Address = profileDTO.Address;
            user.DateOfBirth = profileDTO.DateOfBirth;
            //user.Image= resolveImage(user.Image, profileDTO.Image, user.Username);
            _repository._userRepository.Update(user);
            await _repository.SaveChanges();
            return true;
        }

        public async Task<List<UserVerifyDTO>> getSellersForVerification()
        {
            var users = await _repository._userRepository.GetAll();
            List<User> usersList = users.Where(u => u.UserRole == UserRole.SELLER).ToList();
            List<UserVerifyDTO> userVerifyDTOs = new List<UserVerifyDTO>();
            foreach (User user in usersList)
            {
                UserVerifyDTO userVerifyDTO = _mapper.Map<UserVerifyDTO>(user);
                userVerifyDTO.UserStatus= Enum.GetName(typeof(UserStatus), user.UserStatus);
                userVerifyDTO.DateOfBirth = user.DateOfBirth.ToString("yyyy.MM.dd HH:mm:ss");
                userVerifyDTO.Name = user.FirstName + " " + user.LastName;
                userVerifyDTOs.Add(userVerifyDTO);
            }

            return userVerifyDTOs;
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
            User user = await _repository._userRepository.Get(id);
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

        public async Task<User> getUser(long id)
        {
            return  await  _repository._userRepository.Get(id);
        }

        public async Task<bool> verifyUser(long id)
        {
            User user = await _repository._userRepository.Get(id);
            user.UserStatus = UserStatus.VERIFIED;
            _repository._userRepository.Update(user);
            await _repository.SaveChanges();
            return true;
        }

        public async Task<bool> rejectUser(long id)
        {
            User user = await _repository._userRepository.Get(id);
            user.UserStatus = UserStatus.REJECTED;
            _repository._userRepository.Update(user);
            await _repository.SaveChanges();
            return true;
        }
    }
}
