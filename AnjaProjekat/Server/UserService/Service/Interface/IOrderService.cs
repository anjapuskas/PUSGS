using System.Security.Claims;
using UserService.DTO;

namespace UserService.Service.Interface
{
    public interface IOrderService
    {
        Task<Boolean> addOrder(CreateOrderDTO createOrderDTO);

        Task<List<OrderDTO>> getAllOrders(long id);

        Task<List<OrderDTO>> getNewOrders(System.Security.Claims.ClaimsPrincipal user);

        Task<List<OrderDTO>> getAdminOrders();

        Task<List<OrderDTO>> cancelOrder(long id, ClaimsPrincipal claimsPrincipal);
    }
}
