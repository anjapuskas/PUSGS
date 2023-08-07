namespace UserService.Model
{
    public class Product :EntityBase
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}
