using APlus.Business.Models;
using APlus.Exceptions;

namespace APlus.Tests.Models
{
    public class UserAuthenticatorModelTests
    {
        /**
         * @author Rowen Zaal
         * Should successfully get the correct email.
        */
        [Fact]
        public void GetEmailSuccess()
        {
            //Arrange
            UserAuthenticatorModel userAuthenticatorModel = new(new EmailModel("correct@mail.com"), new PasswordModel("Testpassword123!", false));

            //Act
            EmailModel result = userAuthenticatorModel.GetEmail();

            //Assert
            Assert.NotNull(result);
            Assert.Equal("correct@mail.com", result.GetEmail());
        }

        /**
         * @author Rowen Zaal
         * Should successfully get the correct password.
        */
        [Fact]
        public void GetPasswordSuccess()
        {
            //Arrange
            UserAuthenticatorModel userAuthenticatorModel = new(new EmailModel("correct@mail.com"), new PasswordModel("Testpassword123!", false));

            //Act
            PasswordModel result = userAuthenticatorModel.GetPassword();

            //Assert
            Assert.NotNull(result);
            Assert.Equal("Testpassword123!", result.GetPassword());
        }

        /**
         * @author Rowen Zaal
         * Should not throw an exception when the email and password are both formatted correctly.
         * @param email the email input of a user.
        */
        [Theory]
        [InlineData("valid@mail.com")]
        [InlineData("v@mail.com")]
        [InlineData("valid@m.com")]
        public void ValidateCredentialsCorrectly(string email)
        {
            //Arrange
            UserAuthenticatorModel userAuthenticatorModel = new(new EmailModel(email), new PasswordModel("Testpassword123!", false));

            // Act & Assert
            try
            {
                userAuthenticatorModel.ValidateCredentials();
                Assert.True(true);
            }
            catch
            {
                Assert.True(false);
            }
        }

        /**
         * @author Rowen Zaal
         * Should throw invalid input exception when the email doesn't include ' @ '.
         * Should throw invalid input exception when the email has no characters after ' @ '.
         * Should throw invalid input exception when the email has no characters before ' @ '.
        */
        [Theory]
        [InlineData("invalidmail.com")]
        [InlineData("invalid@")]
        [InlineData("@mail.com")]
        public void ValidateCredentialsThrowExceptionEmail(string email)
        {
            //Arrange
            UserAuthenticatorModel userAuthenticatorModel = new(new EmailModel(email), new PasswordModel("Testpassword123!", false));

            //Act & Assert
            Assert.Throws<InvalidInputException>(() => userAuthenticatorModel.ValidateCredentials());
        }

        /**
         * @author Rowen Zaal
         * Should throw invalid input exception when the password doesn't include a number.
         * Should throw invalid input exception when the password doesn't include lower case characters.
         * Should throw invalid input exception when the password doesn't include upper case characters.
         * Should throw invalid input exception when the password doesn't include special characters.
         * Should throw invalid input exception when the password doesn't include the minimum length of 8 characters.
         * Should throw invalid input exception when the password goes over the maximum length of 32 characters.
         * @param password is a password input example.
        */
        [Theory]
        [InlineData("PasswordHasNoNumber")]
        [InlineData("NOLOWERCASE123!")]
        [InlineData("nouppercase123!")]
        [InlineData("PasswordHasNoSpecialChar123")]
        [InlineData("2Short!")]
        [InlineData("ThisPasswordIsWayTooLongTheMaximumAmmountOfCharactersIsThirtyTwo!!!!!!!!!!!!")]
        public void ValidateCredentialsThrowExceptionPassword(string password)
        {
            //Arrange
            UserAuthenticatorModel userAuthenticatorModel = new(new EmailModel("correct@mail.com"), new PasswordModel(password, false));

            //Act & Assert
            Assert.Throws<InvalidInputException>(() => userAuthenticatorModel.ValidateCredentials());
        }
    }
}
