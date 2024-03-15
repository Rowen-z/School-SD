using APlus.Business.Models;
using APlus.Exceptions;

namespace APlus.Tests.Models
{
    public class EmailModelTests
    {
        /**
         * @author Rowen Zaal
         * Should successfully get the correct email.
        */
        [Fact]
        public void GetEmailSuccess()
        {
            //Arrange
            EmailModel emailModel = new("kees@vankaas.com");

            //Act
            string result = emailModel.GetEmail();

            //Assert
            Assert.NotNull(result);
            Assert.Equal("kees@vankaas.com", result);
        }

        /**
         * @author Rowen Zaal
         * Should not throw an exception when the email is valid.
         * Should not throw an exception when the email has atleast one characters before ' @ '.
         * Should not throw an exception when the email has atleast one characters after ' @ '.
         * @param email the email input of a user.
        */
        [Theory]
        [InlineData("valid@mail.com")]
        [InlineData("v@mail.com")]
        [InlineData("valid@m.com")]
        public void ValidateCorrectly(string email)
        {
            //Arrange
            EmailModel emailModel = new(email);

            // Act & Assert
            try
            {
                emailModel.Validate();
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
         * @param email the email input of a user.
        */
        [Theory]
        [InlineData("invalidmail.com")]
        [InlineData("invalid@")]
        [InlineData("@mail.com")]
        public void ValidateThrowException(string email)
        {
            //Arrange
            EmailModel emailModel = new(email);

            //Act & Assert
            Assert.Throws<InvalidInputException>(() => emailModel.Validate());
        }
    }
}
