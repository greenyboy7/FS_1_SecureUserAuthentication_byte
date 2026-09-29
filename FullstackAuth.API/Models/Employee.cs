using System.ComponentModel.DataAnnotations;
namespace FullstackAuth.API.Models;

public class Employee
{
    [Key]
    public int Id { get; set; } 
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    [Required]
    public string Phone { get; set; } = string.Empty;
    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "Salary must be a positive value.")]
    public decimal Salary { get; set; }
    [Required]
    public string Department { get; set; } = string.Empty;
    [Required]
    public string Position { get; set; } = string.Empty;

}