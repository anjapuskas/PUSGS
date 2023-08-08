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
        private readonly IRepository _repository;
        private readonly IProductService _productService;
        private readonly IUserService _userService;

        public OrderServiceImpl(IMapper mapper, IRepository repository, IProductService productService, IUserService userService)
        {
            _mapper = mapper;
            _repository = repository;
            _productService = productService;
            _userService = userService;
        }

        public async Task<bool> addOrder(CreateOrderDTO createOrderDTO)
        {
            Order order = _mapper.Map<Order>(createOrderDTO);
            order.Buyer = await _userService.getUser(order.UserId);
            order.Created = DateTime.Now;
            order.DeliveryTime = DateTime.Now.AddHours(1).AddHours(new Random().Next(24));
            order.OrderProducts = new List<OrderProduct>();

            foreach (ProductDTO product in createOrderDTO.Products)
            {
                OrderProduct orderProduct = new OrderProduct();
                orderProduct.ProductId = product.Id;
                orderProduct.OrderId = order.Id;
                orderProduct.Order = order;
                orderProduct.Product = await _productService.getProduct(product.Id);
                orderProduct.Price = product.Price;
                orderProduct.Amount = product.Amount;
                order.OrderProducts.Add(orderProduct);
            }

            await _repository._orderRepository.Insert(order);
            await _repository.SaveChanges();



            return true;
        }

        public async Task<List<OrderDTO>> getAllOrders(long id)
        {
            var orders = await _repository._orderRepository.GetAll();
            List<Order> ordersList = orders.Where(o => o.UserId == id && o.OrderStatus != OrderStatus.CANCELLED).ToList();
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            foreach (Order order in ordersList)
            {
                OrderDTO orderDTO = _mapper.Map<OrderDTO>(order);
                orderDTO.OrderStatus = Enum.GetName(typeof(OrderStatus), order.OrderStatus);
                orderDTO.Created = order.Created.ToString("yyyy.MM.dd HH:mm:ss");
                orderDTO.DeliveryTime = order.DeliveryTime.ToString("yyyy.MM.dd HH:mm:ss");
                orderDTOs.Add(orderDTO);
            }

            return orderDTOs;
        }

        public async Task<List<OrderDTO>> getNewOrders()
        {
            var orders = await _repository._orderRepository.GetAll();
            List<Order> ordersList = orders.Where(o => o.OrderStatus == OrderStatus.ORDERED).ToList();
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            foreach (Order order in ordersList)
            {
                OrderDTO orderDTO = _mapper.Map<OrderDTO>(order);
                orderDTO.OrderStatus = Enum.GetName(typeof(OrderStatus), order.OrderStatus);
                orderDTO.Created = order.Created.ToString("yyyy.MM.dd HH:mm:ss");
                orderDTO.DeliveryTime = order.DeliveryTime.ToString("yyyy.MM.dd HH:mm:ss");
                orderDTOs.Add(orderDTO);
            }

            return orderDTOs;
        }

        public async Task<List<OrderDTO>> getAdminOrders()
        {
            var orders = await _repository._orderRepository.GetAll();
            List<Order> ordersList = orders.ToList();
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            foreach (Order order in ordersList)
            {
                OrderDTO orderDTO = _mapper.Map<OrderDTO>(order);
                orderDTO.OrderStatus = Enum.GetName(typeof(OrderStatus), order.OrderStatus);
                orderDTO.Created = order.Created.ToString("yyyy.MM.dd HH:mm:ss");
                orderDTO.DeliveryTime = order.DeliveryTime.ToString("yyyy.MM.dd HH:mm:ss");
                orderDTOs.Add(orderDTO);
            }

            return orderDTOs;
        }

        public async Task<bool> cancelOrder(long id)
        {
            Order order = await _repository._orderRepository.Get(id);
            order.OrderStatus = OrderStatus.CANCELLED;
            _repository._orderRepository.Update(order);
            _repository.SaveChanges();
            return true;
        }
    }
}
