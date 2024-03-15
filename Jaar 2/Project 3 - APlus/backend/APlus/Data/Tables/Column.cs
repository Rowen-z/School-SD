namespace APlus.Data.Tables
{
    /**
     * @author Rowen Zaal
     * Database table Columns
     * @param Id the Id of a column.
     * @param Title the title of a column.
     * @param Position the position of a column.
     * @param Cells defines the relationship between Column and Cell
    */
    public class Column
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Position { get; set; }
        public List<Cell>? Cells { get; set; }
    }
}