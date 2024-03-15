using APlus.Business.Models;
using APlus.Business.UserService;
using APlus.Data.Tables;
using APlus.Exceptions;
using APlus.Repository.UserRepository;
using Microsoft.Extensions.Configuration;
using System.Security.Authentication;

namespace APlus.Tests.Services
{
    public class UserServiceTests
    {
        private readonly Mock<IUserRepository> _userRepositoryMock;
        private readonly Mock<IConfiguration> _configurationMock;
        private readonly UserService _userService;

        /**
         * @author Rowen Zaal
         * Constructor containing a Mock of the UserRepository and a Mock of the Configuration to use the UserService.
        */
        public UserServiceTests()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _configurationMock = new Mock<IConfiguration>();
            _configurationMock.Setup(settings => settings.GetSection("Appsettings:Token").Value).Returns("a092389yko209237");
            _userService = new UserService(_userRepositoryMock.Object, _configurationMock.Object);
        }

        /**
         * @author Rowen Zaal
         * Should successfully return a Json Web Token when login credentials are valid.
        */ 
        [Fact]
        public async Task LoginValidCredentialsReturnsToken()
        {
            //Arrange
            string email = "test@example.com";
            string password = "Testpassword123!";

            User user = new()
            {
                Number = 1,
                Role = "ADMIN",
                Password = "$2a$11$YqXE.8b2ArlJ8kmN1Rgh.exNjXRVutlqltPAHOPyOJDzoPaghs2Wu"
            };

            _userRepositoryMock.Setup(user => user.GetUserByEmail(email)).ReturnsAsync(user);

            //Act
            string token = await _userService.Login(email, password);

            //Assert
            Assert.NotNull(token);
            Assert.NotEmpty(token);
            Assert.True(token.Split('.').Length == 3);
        }

        /**
         * @author Rowen Zaal
         * Should throw an InvalidInputException because the email or password input doesn't match the requirements.
        */
        [Fact]
        public async Task LoginInvalidCredentials()
        {
            //Arrange
            string email = "invalid";
            string password = "invalid";

            //Act
            async Task<string> result() => await _userService.Login(email, password);

            //Assert
            await Assert.ThrowsAsync<InvalidInputException>((Func<Task<string>>)result);
        }

        /**
         * @author Rowen Zaal
         * Should throw an InvalidCredentialsException because the input password doesn't match the password from the database.
        */
        [Fact]
        public void LoginNoMatchingPasswords()
        {
            //Arrange
            string email = "test@example.com";
            string password = "Not1MatchingPassword!";
            UserAuthenticatorModel userAuthenticator = new(new EmailModel(email), new PasswordModel(password, false));
            
            User user = new()
            {
                Number = 1,
                Role = "ADMIN",
                Password = "$2a$11$YqXE.8b2ArlJ8kmN1Rgh.exNjXRVutlqltPAHOPyOJDzoPaghs2Wu"
            };

            _userRepositoryMock.Setup(user => user.GetUserByEmail(email)).ReturnsAsync(user);

            //Act
            Task<string> result() => _userService.Login(email, password);

            //Assert
            Assert.ThrowsAsync<InvalidCredentialException>((Func<Task<string>>)result);
        }
    }
}
