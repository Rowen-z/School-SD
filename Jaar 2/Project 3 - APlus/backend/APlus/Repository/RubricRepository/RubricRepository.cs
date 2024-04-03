namespace APlus.Repository.RubricRepository
{
    public class RubricRepository : IRubricRepository
    {
        private readonly DataContext _context;

        /**
         * @author Rowen Zaal
         * Constructor containing the DataContext of the database.
         * @param context is the DataContext of the database.
        */
        public RubricRepository(DataContext context)
        {
            _context = context;
        }

        /**
         * @author Rowen Zaal
         * Retrieves an existing rubric from the database with its columns and cells.
         * @param rubricId is the ID of the rubric to retrieve.
         * @returns the Rubric table class with the existing rubric properties, including its columns and cells.
         * @throws InvalidOperationException if the rubric is not found.
        */
        public Rubric GetExistingRubric(int rubricId)
        {
            Rubric existingRubric = _context.Rubrics.
                Include(r => r.Columns!).
                ThenInclude(c => c.Cells).
                FirstOrDefault(r => r.Id == rubricId)
                ?? throw new InvalidOperationException("Rubric not found");

            return existingRubric;
        }

        /**
         * @author Rowen Zaal
         * Saves the rubric into the database.
         * @param rubric is a Rubric table class with the properties from the request.
        */
        public async Task AddRubricInDatabase(Rubric rubric)
        {
            _context.Rubrics.Add(rubric);
            await _context.SaveChangesAsync();
        }

        /**
         * @author Rowen Zaal
         * Adds a column to an existing rubric in the database.
         * @param existingRubric is the Rubric table class with the existing rubric properties from the database.
         * @param column is a Column table class with the properties from the request.
        */
        public async Task AddColumnToExistingRubric(Rubric existingRubric, Column column)
        {
            existingRubric.Columns!.Add(column);
            await _context.SaveChangesAsync();
        }

        /**
         * @author Rowen Zaal
         * Adds a cell to an existing column in the database.
         * @param existingColumn is the Column table class with the existing column properties from the existing rubric.
         * @param cell is a Cell table class with the properties from the request.
        */
        public async Task AddCellToExistingColumn(Column existingColumn, Cell cell)
        {
            existingColumn.Cells!.Add(cell);
            await _context.SaveChangesAsync();
        }

        /**
         * @author Rowen Zaal
         * Updates an existing rubric in the database.
         * @param existingRubric is the Rubric table class with the existing rubric properties.
         * @param rubric is a Rubric table class with the updated properties from the request.
        */
        public async Task UpdateExistingRubric(Rubric existingRubric, Rubric rubric)
        {
            existingRubric.Title = rubric.Title;
            existingRubric.Year = rubric.Year;

            _context.Rubrics.Update(existingRubric);
            await _context.SaveChangesAsync();
        }

        /**
         * @author Rowen Zaal
         * Updates an existing column in the database.
         * @param existingColumn is the Column table class with the existing column properties.
         * @param column is a Column table class with the updated properties from the request.
        */
        public async Task UpdateExistingColumn(Column existingColumn, Column column)
        {
            existingColumn.Title = column.Title;

            _context.Columns.Update(existingColumn);
            await _context.SaveChangesAsync();
        }

        /**
         * @author Rowen Zaal
         * Updates an existing cell in the database.
         * @param existingCell is the Cell existing table class with the existing cell properties.
         * @param cell is a Cell table class with the updated properties from the request.
        */
        public async Task UpdateExistingCell(Cell existingCell, Cell cell)
        {
            existingCell.Content = cell.Content;

            _context.Cells.Update(existingCell);
            await _context.SaveChangesAsync();
        }
    }
}
