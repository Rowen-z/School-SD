using System.Security.Authentication;

namespace APlus.Repository.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        /**
         * @author Rowen Zaal
         * Constructor containing the DataContext of the database.
         * @param context is the DataContext of the database.
        */
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        /**
         * @author Rowen Zaal
         * Finds a user by email in the database.
         * @param email is the input email of the user.
         * @returns a user with a matching email in the database.
        */
        public async Task<User> GetUserByEmail(string email)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(user => user.Email == email);

            return user ?? throw new InvalidCredentialException("Invalid credentials");
        }

        /**
         * @author Rowen Zaal
         * Posts a Json Web Token into the database.
         * @param JsonWebToken is a generated unique id.
         * @param number is the UserNumber which is the PK for a user.
         * @param expires is the DateTime at which the session expires.
         * @returns the saved Token.
        */
        public async Task<Token> SaveTokenToDatabase(string JsonWebToken, long number, DateTime expires)
        {
            Token token = new()
            {
                JsonWebToken = JsonWebToken,
                Expires = expires,
                UserNumber = number
            };

            _context.Tokens.Add(token);
            await _context.SaveChangesAsync();

            return token;
        }
    }
}
