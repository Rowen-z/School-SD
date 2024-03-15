namespace APlus.Data.Tables
{
    /**
     * @author Rowen Zaal
     * Database table Cells
     * @param Id the Id of a cell.
     * @param Content the content of a cell.
     * @param Position the position of a cell.
    */
    public class Cell
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public int Position { get; set; }
    }
}