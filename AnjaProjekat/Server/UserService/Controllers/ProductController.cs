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
        public async Task<IActionResult> addProduct([FromBody] ProductDTO productDTO)
        {
            Boolean addProductResult = await _productService.addProduct(productDTO);
            return Ok(addProductResult);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> getAllProducts()
        {
            List<ProductDTO> products = await _productService.getAllProducts();
            return Ok(products);
        }

    }
}