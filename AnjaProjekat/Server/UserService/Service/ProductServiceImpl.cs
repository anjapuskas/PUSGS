using AutoMapper;
using System.Security.Claims;
using UserService.Data;
using UserService.DTO;
using UserService.Model;
using UserService.Service.Interface;

namespace UserService.Service
{
    public class ProductServiceImpl : IProductService
    {

        private readonly IMapper _mapper;
        private readonly IRepository _repository;
        private readonly IUserService _userService;

        public ProductServiceImpl(IMapper mapper, IRepository repository, IUserService userService)
        {
            _mapper = mapper;
            _repository = repository;
            _userService = userService;
        }

        public async Task<bool> addProduct(ProductDTO addProductDTO, ClaimsPrincipal claimsPrincipal)
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

            User user = await _userService.getUser(userId);

            if (user.UserRole == UserRole.SELLER && user.UserStatus != UserStatus.VERIFIED)
            {

                throw new Exception("Korisnik jos nije verifikovan");
            }

            Product product = _mapper.Map<Product>(addProductDTO);
            product.Image = "";

            await _repository._productRepository.Insert(product);
            await _repository.SaveChanges();

           return true;
        }

        public async Task<List<ProductDTO>> getAllProducts()
        {
            var products = await _repository._productRepository.GetAll();
            List<Product> sellerProducts = products.ToList();
            List<ProductDTO> productDTOs = new List<ProductDTO>();
            foreach (Product product in products)
            {
                productDTOs.Add(_mapper.Map<ProductDTO>(product));
            }

            return productDTOs;
        }

        public Task<Product> getProduct(long id)
        {
            return _repository._productRepository.Get(id);
        }
    }
}
