using APlus.Repository.UserRepository;
using System.Security.Claims;

namespace APlus.Business.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        /**
         * @author Rowen Zaal
         * Constructor containing the Interface of the UserRepository.
         * @param userRepository is the Interface of the UserRepository.
         * @param configuration is the Interface of the Configuration used for creating a Json Web Token.
        */
        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        /**
         * @author Rowen Zaal
         * Checks if the given input is valid, get's an existing user by email, checks for identical passwords, creates a claims list and generates a Json Web Token.
         * @param email is the user's email input.
         * @param password is the user's password input.
         * @returns a generated Json Web Token if every other method succeeded.
        */
        public async Task<string> Login(string email, string password)
        {
            UserAuthenticatorModel userAuthenticator = new(new EmailModel(email), new PasswordModel(password, false));

            userAuthenticator.ValidateCredentials();
            User user = await _userRepository.GetUserByEmail(email);
            userAuthenticator.GetPassword().ValidateIdenticalPassword(user.Password);
            List<Claim> claims = CreateClaimsList(user.Number, user.Role);
            string JsonWebToken = await CreateJsonWebToken(userAuthenticator, claims, user.Number);

            return JsonWebToken;
        }

        /**
         * @author Rowen Zaal
         * Creates a Claim List used for the Json Web Token.
         * @param userNumber is the UserNumber of an existing user in the database.
         * @param userRole is the Role of an existing user in the database.
         * @returns a Claim List used for the Json Web Token.
        */
        public List<Claim> CreateClaimsList(long userNumber, string userRole)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, $"{userNumber}"),
                new Claim(ClaimTypes.Role, userRole)
            };

            return claims;
        }

        /**
         * @author Rowen Zaal
         * Creates a Json Web Token when a user logs in. Expires after 7 days and gets stored in the database.
         * @param userAuthenticator is used to generate the Json Web Token.
         * @param claims is the Claim List used for the Json Web Token.
         * @param userNumber is the UserNumber of an existing user in the database.
         * @returns a string containing an encoded Json Web Token generated with HS512.
        */
        public async Task<string> CreateJsonWebToken(UserAuthenticatorModel userAuthenticator, List<Claim> claims, long userNumber)
        {
            string tokenValue = _configuration.GetSection("Appsettings:Token").Value!;
            DateTime expires = DateTime.Now.AddDays(7);
            string JsonWebToken = userAuthenticator.GenerateJsonWebToken(tokenValue, claims, expires);

            await _userRepository.SaveTokenToDatabase(JsonWebToken, userNumber, expires);

            return JsonWebToken;
        }
    }
}