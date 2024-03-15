using System.ComponentModel.DataAnnotations;

namespace APlus.Data.Tables
{
    /**
     * @author Rowen Zaal
     * Database table Tokens
     * @param JsonWebToken generated Json Web Token.
     * @param Expires is the DateTime when the token expires.
     * @param UserNumber the user's number.
     * @param User relationship to the user table.
    */
    public class Token
    {
        [Key]
        public string JsonWebToken { get; set; } = string.Empty;
        public DateTime Expires { get; set; }
        public long UserNumber { get; set; }

        public User? User { get; set; }
    }
}
