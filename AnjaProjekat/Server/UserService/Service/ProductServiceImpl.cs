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
        private readonly IRepository _repository;

        public ProductServiceImpl(IMapper mapper, IRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<bool> addProduct(ProductDTO addProductDTO)
        {
            Product product = _mapper.Map<Product>(addProductDTO);
            product.Image = "";

            _repository._productRepository.Insert(product);
            _repository.SaveChanges();

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
