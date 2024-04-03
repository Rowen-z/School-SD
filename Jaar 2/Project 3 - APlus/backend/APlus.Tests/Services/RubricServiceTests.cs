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
         * Constructor containing a Mock of the RubricRepository to use the RubricService with the mock object.
        */
        public RubricServiceTests()
        {
            _rubricRepositoryMock = new Mock<IRubricRepository>();
            _rubricService = new RubricService(_rubricRepositoryMock.Object);
        }

        /**
         * @author Rowen Zaal
         * When the CreateRubric() method in the rubric service ís called with the correct parameters, 
         * the AddRubricInDatabase() method in the rubric repository get's called once.
        */
        [Fact]
        public async Task CreateRubric_Calls_AddRubricInDatabase_OnRepository()
        {
            //Arrange
            RubricDTO rubricDTO = new();
            Rubric rubric = new();
            long userNumber = 123456789;

            _rubricRepositoryMock.Setup(r => r.AddRubricInDatabase(It.IsAny<Rubric>())).Returns(Task.CompletedTask);

            //Act
            await _rubricService.CreateRubric(rubricDTO, userNumber);

            //Assert
            _rubricRepositoryMock.Verify(r => r.AddRubricInDatabase(It.IsAny<Rubric>()), Times.Once);
        }

        /**
         * @author Rowen Zaal
         * When the UpdateRubric() method in the rubric service ís called with the correct parameters, 
         * the GetExistingRubric() method in the rubric repository get's called once, which returns the existing rubric from the database.
         * UpdateExistingRubric() gets called with the existing rubric and the rubric from the request.
        */
        [Fact]
        public async Task UpdateRubric_Calls_GetExistingRubric_And_UpdateExistingRubric_OnRepository()
        {
            //Arrange
            RubricDTO rubricDTO = new();
            Rubric existingRubric = new();
            int rubricId = 1;

            _rubricRepositoryMock.Setup(r => r.GetExistingRubric(rubricId)).Returns(existingRubric);

            //Act
            await _rubricService.UpdateRubric(rubricDTO, rubricId);

            //Assert
            _rubricRepositoryMock.Verify(r => r.GetExistingRubric(rubricId), Times.Once);
            _rubricRepositoryMock.Verify(r => r.UpdateExistingRubric(existingRubric, It.IsAny<Rubric>()), Times.Once);
        }

        /**
         * @author Rowen Zaal
         * When the rubric from the request contains columns and cells with an existing position, it updates them in the database.
         * When the UpdateRubric() method in the rubric service ís called with the correct parameters,
         * the GetExistingRubric() method in the rubric repository get's called once, which returns the existing rubric from the database.
         * UpdateExistingRubric() gets called with the existing rubric and the rubric from the request.
         * UpdateExistingColumn() gets called, because the column position exists in both the column and existingColumn.
         * UpdateExistingCell() gets called, because the cell position exists in both the cell and existingCell.
        */
        [Fact]
        public async Task UpdateRubric_Calls_Update_Rubric_Columns_Cells_OnRepository()
        {
            //Arrange
            RubricDTO rubricDTO = new()
            {
                Title = "Test Rubric",
                Year = 1,
                Columns = new List<ColumnDTO>
                {
                    new ColumnDTO
                    {
                        Title = "Column 1",
                        Position = 1,
                        Cells = new List<CellDTO>
                        {
                            new CellDTO { Content = "Cell 1", Position = 1 }
                        }
                    }
                }
            };

            Rubric existingRubric = new()
            {
                Title = "Test Rubric",
                Year = 1,
                Columns = new List<Column>
                {
                    new Column
                    {
                        Title = "Column 1",
                        Position = 1,
                        Cells = new List<Cell>
                        {
                            new Cell { Content = "Cell 1", Position = 1 }
                        }
                    }
                }
            };

            int rubricId = 1;

            _rubricRepositoryMock.Setup(r => r.GetExistingRubric(rubricId)).Returns(existingRubric);

            //Act
            await _rubricService.UpdateRubric(rubricDTO, rubricId);

            //Assert
            _rubricRepositoryMock.Verify(r => r.GetExistingRubric(rubricId), Times.Once);
            _rubricRepositoryMock.Verify(r => r.UpdateExistingRubric(existingRubric, It.IsAny<Rubric>()), Times.Once);
            _rubricRepositoryMock.Verify(r => r.UpdateExistingColumn(It.IsAny<Column>(), It.IsAny<Column>()), Times.Once);
            _rubricRepositoryMock.Verify(r => r.UpdateExistingCell(It.IsAny<Cell>(), It.IsAny<Cell>()), Times.Once);
        }

        /**
         * @author Rowen Zaal
         * When the existingColumn from the database is null, because it can't find the position of the column, 
         * AddColumnToExistingRubric() gets called once.
        */
        [Fact]
        public async Task UpdateRubric_Calls_AddColumnToExistingRubric_OnRepository()
        {
            //Arrange
            RubricDTO rubricDTO = new()
            {
                Title = "Test Rubric",
                Year = 1,
                Columns = new List<ColumnDTO>
                {
                    new ColumnDTO
                    {
                        Title = "New column 1",
                        Position = 1
                    }
                }
            };

            Rubric existingRubric = new()
            {
                Title = "Test Rubric",
                Year = 1
            };

            int rubricId = 1;

            _rubricRepositoryMock.Setup(r => r.GetExistingRubric(rubricId)).Returns(existingRubric);

            //Act
            await _rubricService.UpdateRubric(rubricDTO, rubricId);

            //Assert
            _rubricRepositoryMock.Verify(r => r.GetExistingRubric(rubricId), Times.Once);
            _rubricRepositoryMock.Verify(r => r.UpdateExistingRubric(existingRubric, It.IsAny<Rubric>()), Times.Once);
            _rubricRepositoryMock.Verify(r => r.AddColumnToExistingRubric(existingRubric, It.IsAny<Column>()), Times.Once);
        }

        /**
         * @author Rowen Zaal
         * When the existingCell from the database is null, because it can't find the position of the cell, 
         * AddCellToExistingColumn() gets called once.
        */
        [Fact]
        public async Task UpdateRubric_Calls_AddCellToExistingColumn_OnRepository()
        {
            //Arrange
            RubricDTO rubricDTO = new()
            {
                Title = "Test Rubric",
                Year = 1,
                Columns = new List<ColumnDTO>
                {
                    new ColumnDTO
                    {
                        Title = "Column 1",
                        Position = 1,
                        Cells = new List<CellDTO>
                        {
                            new CellDTO { Content = "New cell 2", Position = 2 }
                        }
                    }
                }
            };

            Rubric existingRubric = new()
            {
                Title = "Test Rubric",
                Year = 1,
                Columns = new List<Column>
                {
                    new Column
                    {
                        Title = "Column 1",
                        Position = 1,
                        Cells = new List<Cell>
                        {
                            new Cell { Content = "Cell 1", Position = 1 }
                        }
                    }
                }
            };

            int rubricId = 1;

            _rubricRepositoryMock.Setup(r => r.GetExistingRubric(rubricId)).Returns(existingRubric);

            //Act
            await _rubricService.UpdateRubric(rubricDTO, rubricId);

            //Assert
            _rubricRepositoryMock.Verify(r => r.GetExistingRubric(rubricId), Times.Once);
            _rubricRepositoryMock.Verify(r => r.UpdateExistingRubric(existingRubric, It.IsAny<Rubric>()), Times.Once);
            _rubricRepositoryMock.Verify(r => r.UpdateExistingColumn(It.IsAny<Column>(), It.IsAny<Column>()), Times.Once);
            _rubricRepositoryMock.Verify(r => r.AddCellToExistingColumn(It.IsAny<Column>(), It.IsAny<Cell>()), Times.Once);
        }

        /**
         * @author Rowen Zaal
         * When the UpdateRubric() method in the rubric service ís called with a rubric id that doesn't exist in the database, 
         * the GetExistingRubric() method in the rubric repository get's called once, 
         * which throws an InvalidOperationException("Rubric not found").
        */
        [Fact]
        public async Task UpdateRubric_Calls_GetExistingRubric_And_UpdateExistingRubric_OnRepository_ThrowsException()
        {
            //Arrange
            RubricDTO rubricDTO = new();
            int invalidRubricId = 999;

            _rubricRepositoryMock.Setup(r => r.GetExistingRubric(invalidRubricId)).Throws<InvalidOperationException>();

            //Act
            async Task result() => await _rubricService.UpdateRubric(rubricDTO, invalidRubricId);

            //Assert
            await Assert.ThrowsAsync<InvalidOperationException>(result);
        }
    }
}
