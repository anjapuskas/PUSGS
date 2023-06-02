﻿using UserService.Model;

namespace UserService.DTO
{
    public class AddProductDTO
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
    }
}
