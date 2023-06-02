using UserService.DTO;

namespace UserService.Service.Interface
{
    public interface IProductService
    {
        Task<Boolean> addProduct(AddProductDTO addProductDTO);

    }
}
