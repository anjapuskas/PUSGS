using AutoMapper;
using UserService.Data;
using UserService.DTO;
using UserService.Model;
using UserService.Service.Interface;

namespace UserService.Service
{
    public class ProductServiceImpl : IProductService
    {

        private readonly IMapper _mapper;
        private readonly EShopDbContext _dbContext;

        public ProductServiceImpl(IMapper mapper, EShopDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<bool> addProduct(ProductDTO addProductDTO)
        {
            Product product = _mapper.Map<Product>(addProductDTO);
            product.Image = "";

            _dbContext.Product.Add(product);
            _dbContext.SaveChanges();

           return true;
        }

        public async Task<List<ProductDTO>> getAllProducts()
        {
            List<Product> products = _dbContext.Product.ToList();
            List<ProductDTO> productDTOs = new List<ProductDTO>();
            foreach (Product product in products)
            {
                productDTOs.Add(_mapper.Map<ProductDTO>(product));
            }

            return productDTOs;
        }
    }
}
