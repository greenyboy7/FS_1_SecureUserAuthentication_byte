using Microsoft.AspNetCore.Identity;

namespace FullstackAuth.API.Models;

public class User : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
}