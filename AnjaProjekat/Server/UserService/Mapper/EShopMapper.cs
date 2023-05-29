using AutoMapper;
using UserService.DTO;
using UserService.Model;

namespace UserService.Mapper
{
    public class EShopMapper : Profile
    {
        public EShopMapper()
        {
            CreateMap<User, LoginResultDTO>().ReverseMap();
            CreateMap<RegisterDTO, User>().ReverseMap();
        }
    }
}
