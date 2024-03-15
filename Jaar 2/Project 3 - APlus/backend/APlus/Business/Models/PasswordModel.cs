using System.Security.Authentication;
using System.Text.RegularExpressions;

namespace APlus.Business.Models
{
    public class PasswordModel
    {
        private string Password { get; set; } = string.Empty;
        private string HashedPassword { get; set; } = string.Empty;

        /**
         * @author Rowen Zaal
         * Regex requirements:
         - Contains at least one number,
         - Contains at least one lower case character, 
         - Contains at least one upper case character, 
         - Contains at least one special character, 
         - Minimum length is 8 and maximum length is 32.
        */
        private string Regex { get; set; } = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,32}$";

        /**
         * @author Rowen Zaal
         * Creates a new instance of the PasswordModel class.
         * @param password the user's password.
         * @param isHashedPassword boolean if password is already hashed or not.
        */
        public PasswordModel(string password, bool isHashedPassword)
        {
            if (isHashedPassword)
            {
                HashedPassword = password;
            }
            else
            {
                Password = password;
            }
        }

        /**
         * @author Rowen Zaal
         * Gets the Password property.
         * @returns the Password property containg a string.
        */
        public string GetPassword()
        {
            return Password;
        }

        /**
         * @author Rowen Zaal
         * Gets the HashedPassword property.
         * @returns the HashedPassword property containg a string.
        */
        public string GetHashedPassword()
        {
            return HashedPassword;
        }

        /**
         * @author Rowen Zaal
         * Checks for a valid password.
         * @throws an InvalidInputException when the password doesn't match the regex.
        */
        public void Validate()
        {
            Regex passwordPattern = new(Regex);
            if (!passwordPattern.IsMatch(Password))
            {
                throw new InvalidInputException("Invalid input");
            }
        }

        /**
         * @author Rowen Zaal
         * Checks if the hashed password of an existing user matches the given hashed password.
         * @param hashedPassword is the hashed password of an existing user in the database.
         * @throws InvalidCredentialsException when the given password and hashedPassword don't match.
        */
        public void ValidateIdenticalPassword(string hashedPassword)
        {
            if(!BCrypt.Net.BCrypt.EnhancedVerify(Password, hashedPassword))
            {
                throw new InvalidCredentialException("Invalid credentials");
            }
        }
    }
}
