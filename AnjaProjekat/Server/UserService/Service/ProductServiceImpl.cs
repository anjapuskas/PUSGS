﻿using AutoMapper;
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

            if (addProductDTO.PictureFile != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    addProductDTO.PictureFile.CopyTo(memoryStream);
                    var pictureByte = memoryStream.ToArray();
                    product.Picture = pictureByte;
                }
            }

            await _repository._productRepository.Insert(product);
            await _repository.SaveChanges();

           return true;
        }

        public async Task<List<ProductItemDTO>> getAllProducts()
        {
            var products = await _repository._productRepository.GetAll();
            List<Product> productList = products.Where(p => p.Amount > 0).ToList();
            List<ProductItemDTO> productDTOs = new List<ProductItemDTO>();
            foreach (Product product in productList)
            {
                productDTOs.Add(_mapper.Map<ProductItemDTO>(product));
            }

            return productDTOs;
        }

        public Task<Product> getProduct(long id)
        {
            return _repository._productRepository.Get(id);
        }
    }
}
