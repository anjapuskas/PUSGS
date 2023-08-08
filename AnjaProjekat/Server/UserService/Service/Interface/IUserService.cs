using UserService.DTO;
using UserService.Model;

namespace UserService.Service.Interface
{
    public interface IUserService
    {
        Task<LoginResultDTO> login(LoginAttemptDTO login);
        Task<Boolean> register(RegisterDTO registerDTO);
        Task<Boolean> updateProfile(ProfileDTO profileDTO);
        Task<ProfileImageDTO> getProfileImage(long id);
        Task<User> getUser(long id);
        Task<List<UserVerifyDTO>> getSellersForVerification();
        Task<Boolean> verifyUser(long id);
        Task<Boolean> rejectUser(long id);

    }
}
