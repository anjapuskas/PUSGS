using UserService.DTO;
using UserService.Model;

namespace UserService.Service.Interface
{
    public interface IProductService
    {
        Task<Boolean> addProduct(ProductDTO addProductDTO);

        Task<List<ProductDTO>> getAllProducts();

        Product getProduct(long id);

    }
}
