using System.ComponentModel.DataAnnotations;

namespace APlus.Business.DTOs
{
    public class LoginDTO
    {
        /**
         * @author Rowen Zaal
         * Data Transfer Object used for the login functionality.
         * @param Email containing the users's email input.
         * @param Password containing the users's password input.
        */
        [Required(ErrorMessage = "Invalid input")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Invalid input")]
        public string Password { get; set; } = string.Empty;
    }
}
