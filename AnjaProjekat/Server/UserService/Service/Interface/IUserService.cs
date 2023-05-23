using UserService.DTO;

namespace UserService.Service.Interface
{
    public interface IUserService
    {
        Task<LoginResultDTO> login(LoginAttemptDTO login);
    }
}
