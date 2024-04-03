using APlus.Repository.RubricRepository;

namespace APlus.Business.RubricService
{
    public class RubricService : IRubricService
    {
        private readonly IRubricRepository _rubricRepository;

        /**
         * @author Rowen Zaal
         * Constructor containing the Interface of the RubricRepository.
         * @param rubricRepository is the Interface of the RubricRepository.
        */
        public RubricService(IRubricRepository rubricRepository)
        {
            _rubricRepository = rubricRepository;
        }

        /**
         * @author Rowen Zaal
         * Converts the RubricDTO to a rubric table class and awaits the RubricRepository to save the rubric in the database.
         * @param rubricDTO is the RubricDTO model containing all properties from the request.
         * @param userNumber is the userNumber of an authorized user that sent the request.
         * @returns an integer of database changes to the RubricController.
        */
        public async Task CreateRubric(RubricDTO rubricDTO, long userNumber)
        {
            RubricModel rubricModel = new(rubricDTO, userNumber);
            Rubric rubric = rubricModel.ConvertDtoToDataModel();

            await _rubricRepository.AddRubricInDatabase(rubric);
        }

        /**
         * @author Rowen Zaal
         * Converts the RubricDTO to rubric table class, get's the existing rubric with a rubricId. 
         * Existing rubric get's updated with the updated properties, if the rubric got columns, each column goes to UpdateColumns().
         * @param rubricDTO is a RubricDTO object with the updated properties.
         * @param rubricId is the ID of the rubric to update.
        */
        public async Task UpdateRubric(RubricDTO rubricDTO, int rubricId)
        {
            RubricModel rubricModel = new(rubricDTO);
            Rubric rubric = rubricModel.ConvertDtoToDataModel();

            Rubric existingRubric = _rubricRepository.GetExistingRubric(rubricId);

            if (rubric.Columns != null)
            {
                foreach (Column column in rubric.Columns)
                {
                    await UpdateColumns(existingRubric, column);
                }
            }

            await _rubricRepository.UpdateExistingRubric(existingRubric, rubric);
        }

        /**
         * @author Rowen Zaal
         * Updates an existing column in the database based on the provided column and the existing column in the rubric.
         * If a column has a new position number, it get's added to the existing rubric.
         * @param existingRubric is the Rubric table class with the existing rubric properties.
         * @param column is a Column table class with the updated properties.
        */
        private async Task UpdateColumns(Rubric existingRubric, Column column)
        {
            ColumnModel columnModel = new(existingRubric, column);
            Column? existingColumn = columnModel.GetExistingColumn();

            if (existingColumn != null)
            {
                await _rubricRepository.UpdateExistingColumn(existingColumn, column);

                if (column.Cells != null)
                {
                    foreach (Cell cell in column.Cells)
                    {
                        await UpdateCells(existingColumn, cell);
                    }
                }
            }
            else
            {
                columnModel.MakeNewListOfColumn();
                await _rubricRepository.AddColumnToExistingRubric(columnModel.GetExistingRubric(), column);
            }
        }

        /**
         * @author Rowen Zaal
         * Updates an existing cell in the database based on the provided cell and the existing cell in the column.
         * If a cell has a new position number, it get's added to the existing column.
         * @param existingColumn is the Column table class with the existing column properties.
         * @param cell is a Cell table class with the updated properties.
        */
        private async Task UpdateCells(Column existingColumn, Cell cell)
        {
            CellModel cellModel = new(existingColumn, cell);
            Cell? existingCell = cellModel.GetExistingCell();

            if (existingCell != null)
            {
                await _rubricRepository.UpdateExistingCell(existingCell, cell);
            }
            else
            {
                cellModel.MakeNewListOfCell();
                await _rubricRepository.AddCellToExistingColumn(cellModel.GetExistingColumn(), cell);
            }
        }
    }
}
