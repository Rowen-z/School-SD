using System.ComponentModel.DataAnnotations;

namespace APlus.Data.Tables
{
    /**
     * @author Rowen Zaal
     * Database table Users.
     * @param Number    the user's number.
     * @param FirstName the user's firstname.
     * @param Prefix    the user's prefix.
     * @param LastName  the user's lastname.
     * @param Password  current instance of the Password class.
     * @param Email     current instance of the Email class.
     * @param Role      the user's userrole.
    */
    public class User
    {
        [Key, MinLength(9), MaxLength(9)]
        public long Number { get; set; }

        [MinLength(2), MaxLength(255)]
        public string FirstName { get; set; } = string.Empty;

        [MinLength(0), MaxLength(32)]
        public string? Prefix { get; set; } = null;

        [MinLength(2), MaxLength(255)]
        public string LastName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
