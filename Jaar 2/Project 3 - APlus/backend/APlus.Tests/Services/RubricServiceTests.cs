using APlus.Business.DTOs;
using APlus.Business.RubricService;
using APlus.Data.Tables;
using APlus.Repository.RubricRepository;

namespace APlus.Tests.Services
{
    public class RubricServiceTests
    {
        private readonly Mock<IRubricRepository> _rubricRepositoryMock;
        private readonly RubricService _rubricService;

        /**
         * @author Rowen Zaal
         * Constructor containing a Mock of the RubricRepository to use the RubricService.
        */
        public RubricServiceTests()
        {
            _rubricRepositoryMock = new Mock<IRubricRepository>();
            _rubricService = new RubricService(_rubricRepositoryMock.Object);
        }

        /**
         * @author Rowen Zaal
         * Should successfully return the ammount of changes that happened in the database, in this testcase it's '3'.
        */
        [Fact]
        public async Task CreateRubricValid()
        {
            //Arrange
            RubricDTO rubricDTO = new()
            {
                Title = "Test",
                Year = 1,
                Columns = new List<ColumnDTO>
                {
                    new ColumnDTO
                    {
                        Title = "Leerresultaat",
                        Position = 0,
                        Cells = new List<CellDTO>
                        {
                            new CellDTO { Content = "Test cel 1", Position = 1 }
                        }
                    }
                }
            };

            long userNumber = 123456789;

            _rubricRepositoryMock.Setup(repo => repo.SaveRubricInDatabase(It.IsAny<Rubric>())).ReturnsAsync(3);

            //Act
            int result = await _rubricService.CreateRubric(rubricDTO, userNumber);

            //Assert
            Assert.Equal(3, result);
        }
    }
}
