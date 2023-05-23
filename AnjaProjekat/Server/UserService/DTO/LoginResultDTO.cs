namespace UserService.DTO
{
    public class LoginResultDTO
    {
        public int id { get; set; }
        public string Password { get; set; }
        public string UserRole { get; set; }
        public string Token { get; set; }
    }
}
