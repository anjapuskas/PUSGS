using UserService.DTO;

namespace UserService.Service.Interface
{
    public interface IUserService
    {
        Task<LoginResultDTO> login(LoginAttemptDTO login);

        Task<Boolean> register(RegisterDTO registerDTO);

        Task<Boolean> updateProfile(ProfileDTO profileDTO);
        Task<ProfileImageDTO> getProfileImage(long id);
    }
}
