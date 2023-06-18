using AutoMapper;
using UserService.Data;
using UserService.DTO;
using UserService.Model;
using UserService.Service.Interface;

namespace UserService.Service
{
    public class OrderServiceImpl : IOrderService
    {

        private readonly IMapper _mapper;
        private readonly EShopDbContext _dbContext;
        private readonly IProductService _productService;
        private readonly IUserService _userService;

        public OrderServiceImpl(IMapper mapper, EShopDbContext dbContext, IProductService productService, IUserService userService)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _productService = productService;
            _userService = userService;
        }

        public async Task<bool> addOrder(CreateOrderDTO createOrderDTO)
        {
            Order order = _mapper.Map<Order>(createOrderDTO);
            order.Buyer = _userService.getUser(order.UserId);
            _dbContext.Order.Add(order);
            _dbContext.SaveChanges();

            foreach (ProductDTO product in createOrderDTO.Products)
            {
                OrderProduct orderProduct = new OrderProduct();
                orderProduct.ProductId = product.Id;
                orderProduct.OrderId = order.Id;
                orderProduct.Order = order;
                orderProduct.Product = _productService.getProduct(product.Id);
                orderProduct.Price = product.Price;
                orderProduct.Amount = product.Amount;
                _dbContext.OrderProduct.Add(orderProduct);
                _dbContext.SaveChanges();
            }

            return true;
        }
    }
}
