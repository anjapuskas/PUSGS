using UserService.DTO;

namespace UserService.Service.Interface
{
    public interface IProductService
    {
        Task<Boolean> addProduct(ProductDTO addProductDTO);

        Task<List<ProductDTO>> getAllProducts();

    }
}
