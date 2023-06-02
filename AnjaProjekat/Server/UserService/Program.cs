using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UserService.Data;
using UserService.Service.Interface;
using UserService.Service;
using AutoMapper;
using UserService.Mapper;

string _cors = "cors";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("ApplicationSettings")["secret"]));
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true, 
        ValidateAudience = false, 
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true, 
        ValidIssuer = "https://localhost:44350/", 
        IssuerSigningKey = key
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: _cors, builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .SetIsOriginAllowed(origin => true)
               .AllowCredentials();
    });
});

builder.Services.AddDbContext<EShopDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("UserServiceDatabase"));
});

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new EShopMapper());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddScoped<IUserService, UserServiceImpl>();
builder.Services.AddScoped<IProductService, ProductServiceImpl>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors(_cors);

app.MapControllers();

app.Run();
