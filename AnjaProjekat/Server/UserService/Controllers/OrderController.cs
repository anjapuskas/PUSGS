using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserService.DTO;
using UserService.Service.Interface;

namespace UserService.Configuration
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService _orderService;
        private readonly IProductService _productService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("add")]
        [Authorize(Roles = "BUYER,SELLER")]
        public async Task<IActionResult> addOrder([FromBody] CreateOrderDTO createOrderDTO)
        {
            Boolean addOrderResult = await _orderService.addOrder(createOrderDTO);
            return Ok(addOrderResult);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "BUYER,SELLER")]
        public async Task<IActionResult> getAllOrders(long id)
        {
            List<OrderDTO> orders = await _orderService.getAllOrders(id);
            return Ok(orders);
        }

        [HttpGet("new")]
        [Authorize(Roles = "SELLER")]
        public async Task<IActionResult> getNewOrders()
        {
            List<OrderDTO> orders = await _orderService.getNewOrders(User);
            return Ok(orders);
        }

        [HttpGet("admin")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> getAdminOrders()
        {
            List<OrderDTO> orders = await _orderService.getAdminOrders();
            return Ok(orders);
        }

        [HttpPost("cancel/{id}")]
        [Authorize(Roles = "BUYER,SELLER")]
        public async Task<IActionResult> cancelOrder(long id)
        {
            await _orderService.cancelOrder(id);
            return Ok();
        }
    }
}
