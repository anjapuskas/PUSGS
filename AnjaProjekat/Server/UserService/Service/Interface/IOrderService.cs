using UserService.DTO;

namespace UserService.Service.Interface
{
    public interface IOrderService
    {
        Task<Boolean> addOrder(CreateOrderDTO createOrderDTO);
    }
}
