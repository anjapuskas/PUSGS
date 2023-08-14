﻿using AutoMapper;
using System.Security.Claims;
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
        private readonly IHttpContextAccessor _httpContextAccessor;

        public OrderServiceImpl(IMapper mapper, IRepository repository, IProductService productService, IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _repository = repository;
            _productService = productService;
            _userService = userService;
            _httpContextAccessor = httpContextAccessor;
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

                if(orderProduct.Product.Amount < product.Amount)
                {
                    throw new Exception("Nedovoljno kolicine za proizvod " + product.Name);
                }
                orderProduct.Product.Amount = orderProduct.Product.Amount - product.Amount;

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

        public async Task<List<OrderDTO>> getNewOrders(System.Security.Claims.ClaimsPrincipal claimsPrincipal)
        {
            var userIdClaim = claimsPrincipal.Claims.First(c => c.Type == "id").Value;

            if(userIdClaim == null)
            {
                throw new Exception("Ponovite login");
            }

            if (!long.TryParse(userIdClaim, out long userId))
            {
                throw new Exception("Nije moguće pretvoriti ID korisnika u broj.");
            }

            User user = await _userService.getUser(userId);

            if(user.UserRole == UserRole.SELLER && user.UserStatus != UserStatus.VERIFIED)
            {
                
                throw new Exception("Korisnik jos nije verifikovan");
                
            }

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

        public async Task<List<OrderDTO>> cancelOrder(long id, ClaimsPrincipal claimsPrincipal)
        {

            var userIdClaim = claimsPrincipal.Claims.First(c => c.Type == "id").Value;

            if (userIdClaim == null)
            {
                throw new Exception("Ponovite login");
            }

            if (!long.TryParse(userIdClaim, out long userId))
            {
                throw new Exception("Nije moguće pretvoriti ID korisnika u broj.");
            }

            Order order = await _repository._orderRepository.Get(id);
            if (order == null)
            {
                throw new Exception("Order does not exist.");
            }
            TimeSpan pastTime = DateTime.Now - order.Created; ;
            if (pastTime.TotalHours > 1)
            {
                throw new Exception("The time has passed for cancelling the order.");
            }

            order.OrderStatus = OrderStatus.CANCELLED;
            var orderProducts = await _repository._orderProductRepository.GetAll();
            List<OrderProduct> orderProductsList = orderProducts.Where(op => op.OrderId == order.Id).ToList();
            foreach (OrderProduct orderProduct in order.OrderProducts)
            {
                var product = await _repository._productRepository.Get(orderProduct.ProductId);
                product.Amount += orderProduct.Amount;
                _repository._productRepository.Update(product);
            }

            _repository._orderRepository.Update(order);
            await _repository.SaveChanges();
            return await getAllOrders(userId);
        }
    }
}
