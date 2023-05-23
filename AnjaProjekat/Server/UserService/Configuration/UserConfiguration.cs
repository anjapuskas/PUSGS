using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UserService.Model;

namespace UserService.Configuration
{
    public class UserConfigurations : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(user => user.Id);
            builder.Property(user=> user.Id).ValueGeneratedOnAdd();
            builder.Property(user => user.Username).HasMaxLength(30);
            builder.Property(user => user.Username).IsRequired();
            builder.HasIndex(user => user.Username).IsUnique();
            builder.Property(user => user.Email).HasMaxLength(320);
            builder.Property(user => user.Email).IsRequired();
            builder.HasIndex(user => user.Email).IsUnique();
            builder.Property(user => user.Password).IsRequired();
            builder.Property(user => user.FirstName).HasMaxLength(60);
            builder.Property(user => user.FirstName).IsRequired();
            builder.Property(user => user.LastName).HasMaxLength(60);
            builder.Property(user => user.LastName).IsRequired();
            builder.Property(user => user.DateOfBirth).IsRequired();
            builder.Property(user => user.UserRole).HasConversion(new EnumToStringConverter<UserRole>());
        }
    }
}
