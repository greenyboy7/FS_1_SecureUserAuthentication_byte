using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using FullstackAuth.API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;


[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<User> _userManager;


    public AuthController(UserManager<User> userManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] FullstackAuth.API.DTOs.RegisterRequest registerDto)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userExist = await _userManager.FindByEmailAsync(registerDto.Email);
        if (userExist != null)
        {
            return BadRequest("User already exists");
        }

        var newUser = new User
        {
            FullName = registerDto.FullName,
            Email = registerDto.Email,
            UserName = registerDto.Email

        };
        var result = await _userManager.CreateAsync(newUser, registerDto.Password);
        if (result.Succeeded)
        {
            return Ok("User created successfully. You can now log in ");
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }

        return BadRequest(ModelState);


    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] FullstackAuth.API.DTOs.LoginRequest loginRequest)
    {
        var user = await _userManager.FindByEmailAsync(loginRequest.Email);
        if (user == null)
        {
            return Unauthorized("Invalid email or password");
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginRequest.Password);
        if (!isPasswordValid)
        {
            return Unauthorized("Invalid email or password");
        }

        var token = await GenerateJwtToken(user);
        return Ok(new { Token = token });

    }

    private async Task<string> GenerateJwtToken(User user)
    {
        var claims = new List<Claim>

        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName!),
            new Claim(ClaimTypes.Email, user.Email!)

        };
        var userRoles = await _userManager.GetRolesAsync(user);
        foreach (var role in userRoles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes
            (_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials
            (key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                double.Parse(_configuration["Jwt:DurationInMinutes"]!)),
            signingCredentials: credentials

        );
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);

    }

    [HttpGet("me")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public IActionResult Me()
    {
        return Ok(new
        {
            Message = "You are authenticated",
            User = User.Identity?.Name
        });
    }


}

