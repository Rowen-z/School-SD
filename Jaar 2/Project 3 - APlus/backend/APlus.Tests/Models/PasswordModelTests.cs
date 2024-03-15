using APlus.Business.Models;
using APlus.Exceptions;

namespace APlus.Tests.Models
{
    public class PasswordModelTests
    {
        /**
         * @author Rowen Zaal
         * Should successfully get the correct password.
        */
        [Fact]
        public void GetPasswordSuccess()
        {
            //Arrange
            PasswordModel passwordModel = new("Testpassword123!", false);

            //Act
            string result = passwordModel.GetPassword();

            //Assert
            Assert.NotNull(result);
            Assert.Equal("Testpassword123!", result);
        }

        /**
         * @author Rowen Zaal
         * Should not throw an exception when the password matches the Regex.
        */
        [Fact]
        public void ValidateCorrectly()
        {
            //Arrange
            PasswordModel passwordModel = new("Validpassword123!", false);

            // Act & Assert
            try
            {
                passwordModel.Validate();
                Assert.True(true);
            }
            catch
            {
                Assert.True(false);
            }
        }

        /**
         * @author Rowen Zaal
         * Should throw invalid input exception when the password doesn't include a number.
         * Should throw invalid input exception when the password doesn't include lower case characters.
         * Should throw invalid input exception when the password doesn't include upper case characters.
         * Should throw invalid input exception when the password doesn't include special characters.
         * Should throw invalid input exception when the password doesn't include the minimum length of 8 characters.
         * Should throw invalid input exception when the password goes over the maximum length of 32 characters.
         * @param password the password input of a user.
        */
        [Theory]
        [InlineData("PasswordHasNoNumber")]
        [InlineData("NOLOWERCASE123!")]
        [InlineData("nouppercase123!")]
        [InlineData("PasswordHasNoSpecialChar123")]
        [InlineData("2Short!")]
        [InlineData("ThisPasswordIsWayTooLongTheMaximumAmmountOfCharactersIsThirtyTwo!!!!!!!!!!!!")]
        public void ValidateThrowException(string password)
        {
            //Arrange
            PasswordModel passwordModel = new(password, false);

            //Act & Assert
            Assert.Throws<InvalidInputException>(() => passwordModel.Validate());
        }
    }
}
