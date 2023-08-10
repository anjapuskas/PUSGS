using System.Security.Claims;
using UserService.DTO;
using UserService.Model;

namespace UserService.Service.Interface
{
    public interface IProductService
    {
        Task<Boolean> addProduct(ProductDTO addProductDTO, ClaimsPrincipal claimsPrincipal);

        Task<List<ProductDTO>> getAllProducts();

        Task<Product> getProduct(long id);

    }
}
