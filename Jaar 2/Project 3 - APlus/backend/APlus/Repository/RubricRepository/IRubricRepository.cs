namespace APlus.Repository.RubricRepository
{
    /**
     * @author Rowen Zaal
     * Interface containing the methods of the RubricRepository.
    */
    public interface IRubricRepository
    {
        Rubric GetExistingRubric(int rubricId);
        Task AddRubricInDatabase(Rubric rubric);
        Task AddColumnToExistingRubric(Rubric existingRubric, Column column);
        Task AddCellToExistingColumn(Column existingColumn, Cell cell);
        Task UpdateExistingRubric(Rubric existingRubric, Rubric rubric);
        Task UpdateExistingColumn(Column existingColumn, Column column);
        Task UpdateExistingCell(Cell existingCell, Cell cell);
    }
}
