namespace APlus.Business.Models
{
    public class CellModel
    {
        private Column ExistingColumn { get; set; }
        private Cell Cell {  get; set; }

        /**
         * @author Rowen Zaal
         * Creates a new instance of the CellModel class.
         * @param cell is a Cell table class with the updated properties.
        */
        public CellModel(Column existingColumn, Cell cell)
        {
            ExistingColumn = existingColumn;
            Cell = cell;
        }

        /**
         * @author Rowen Zaal
         * Gets the ExistingColumn property.
         * @returns the existing column from the existing rubric.
        */
        public Column GetExistingColumn()
        {
            return ExistingColumn;
        }

        /**
         * @author Rowen Zaal
         * Retrieves an existing cell from the existing column based on the position of the cell.
         * @returns the existing cell from the existing column by looking at the cell position, or null if not found.
        */
        public Cell? GetExistingCell()
        {
            return ExistingColumn.Cells?.FirstOrDefault(c => c.Position == Cell.Position);
        }

        /**
         * @author Rowen Zaal
         * Makes a new list of Cell when the ExistingColumn.Cells is null.
        */
        public void MakeNewListOfCell()
        {
            ExistingColumn.Cells ??= new List<Cell>();
        }
    }
}
