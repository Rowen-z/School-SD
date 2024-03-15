namespace APlus.Repository.UserRepository
{
    /**
     * @author Rowen Zaal
     * Interface containing the methods of the UserRepository.
    */
    public interface IUserRepository
    {
        Task<User> GetUserByEmail(string email);
        Task<Token> SaveTokenToDatabase(string JsonWebToken, long number, DateTime expires);
    }
}
