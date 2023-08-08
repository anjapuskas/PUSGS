using UserService.DTO;

namespace UserService.Service.Interface
{
    public interface IOrderService
    {
        Task<Boolean> addOrder(CreateOrderDTO createOrderDTO);

        Task<List<OrderDTO>> getAllOrders(long id);

        Task<List<OrderDTO>> getNewOrders();

        Task<List<OrderDTO>> getAdminOrders();

        Task<Boolean> cancelOrder(long id);
    }
}
