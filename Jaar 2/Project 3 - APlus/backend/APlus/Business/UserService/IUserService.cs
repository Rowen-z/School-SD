using System.Security.Claims;

namespace APlus.Business.UserService
{
    /**
     * @author Rowen Zaal
     * Interface containing the methods of the UserService.
    */
    public interface IUserService
    {
        Task<string> Login(string email, string password);
        List<Claim> CreateClaimsList(long userNumber, string userRole);
        Task<string> CreateJsonWebToken(UserAuthenticatorModel userAuthenticator, List<Claim> claims, long userNumber);
    }
}
