using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserService.DTO;
using UserService.Model;
using UserService.Service.Interface;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {

        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("add")]
        [Authorize(Roles = "SELLER")]
        public async Task<IActionResult> addProduct([FromBody] AddProductDTO addProductDTO)
        {
            Boolean addProductResult = await _productService.addProduct(addProductDTO);
            return Ok(addProductResult);
        }

    }
}