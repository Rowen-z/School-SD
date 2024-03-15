using APlus.Business.DTOs;
using APlus.Business.RubricService;
using APlus.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace APlus.Tests.Controllers
{
    public class RubricControllerTests
    {
        private readonly RubricController _rubricController;

        /**
         * @author Rowen Zaal
         * Constructor containing a Mock of the RubricService to use the RubricController.
        */
        public RubricControllerTests()
        {
            Mock<IRubricService> rubricServiceMock = new();
            _rubricController = new RubricController(rubricServiceMock.Object);
        }

        /**
         * @author Rowen Zaal
         * Should return OkObjectResult when the rubricDTO is valid and the UserRole of a user is either ADMIN or TEACHER.
         * @param role is the UserRole of an existing user.
        */
        [Theory]
        [InlineData("ADMIN")]
        [InlineData("TEACHER")]
        public async Task CreateRubricValidData(string role)
        {
            // Arrange
            RubricDTO rubricDTO = new() { };

            ClaimsIdentity identity = new(new[]
            {
                new Claim(ClaimTypes.Name, "123456789"),
                new Claim(ClaimTypes.Role, role)
            });

            ClaimsPrincipal principal = new(identity);

            _rubricController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = principal }
            };

            // Act
            IActionResult result = await _rubricController.CreateRubric(rubricDTO);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }
    }
}
