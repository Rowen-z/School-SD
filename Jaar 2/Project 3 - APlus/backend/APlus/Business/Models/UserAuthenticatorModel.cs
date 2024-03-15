using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace APlus.Business.Models
{
    public class UserAuthenticatorModel
    {
        private EmailModel Email { get; set; }
        private PasswordModel Password { get; set; }

        /**
         * @author Rowen Zaal
         * Creates a new instance of the UserAuthenticatorModel class.
         * @param email the user's email.
         * @param password the users's password.
        */
        public UserAuthenticatorModel(EmailModel email, PasswordModel password) 
        {
            Email = email;
            Password = password;
        }

        /**
         * @author Rowen Zaal
         * Gets the Email property.
         * @returns the Email property containing the EmailModel.
        */
        public EmailModel GetEmail()
        {
            return Email;
        }

        /**
         * @author Rowen Zaal
         * Gets the Password property.
         * @returns the Password property containing the PasswordModel.
        */
        public PasswordModel GetPassword()
        {
            return Password;
        }

        /**
         * @author Rowen Zaal
         * Checks if the Email & Password properties are valid.
        */
        public void ValidateCredentials()
        {
            Email.Validate();
            Password.Validate();
        }

        /**
         * @author Rowen Zaal
         * Generates a Json Web Token used to store in a cookie.
         * @returns a string containing the Json Web Token.
        */
        public string GenerateJsonWebToken(string tokenValue, List<Claim> claims, DateTime expires)
        {   
            SymmetricSecurityKey key = new(System.Text.Encoding.UTF8.GetBytes(tokenValue));
            SigningCredentials credentials = new(key, SecurityAlgorithms.HmacSha512Signature);
            JwtSecurityToken token = new(claims: claims, expires: expires, signingCredentials: credentials);
            string JsonWebToken = new JwtSecurityTokenHandler().WriteToken(token);

            return JsonWebToken;
        }   
    }
}
