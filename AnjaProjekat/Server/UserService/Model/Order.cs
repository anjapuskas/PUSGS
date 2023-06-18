namespace UserService.Model
{
    public class Order
    {
        public long Id { get; set; }
        public double Price { get; set; }  
        public string Comment { get; set; } 
        public string Address { get; set; }
        public DateTime Created { get; set; }   
        public OrderStatus OrderStatus { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
        public User Buyer { get; set; }
        public int UserId { get; set; }


    }
}
