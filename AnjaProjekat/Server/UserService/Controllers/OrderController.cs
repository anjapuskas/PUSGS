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
        [Authorize(Roles = "BUYER")]
        public async Task<IActionResult> addOrder([FromBody] CreateOrderDTO createOrderDTO)
        {
            Boolean addOrderResult = await _orderService.addOrder(createOrderDTO);
            return Ok(addOrderResult);
        }
    }
}
