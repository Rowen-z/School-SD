namespace APlus.Business.Models
{
    public class ColumnModel
    {
        private Rubric ExistingRubric { get; set; }
        private Column Column { get; set; }

        /**
         * @author Rowen Zaal
         * Creates a new instance of the ColumnModel class.
         * @param existingRubric is the Rubric table class with the existing rubric properties.
         * @param column is a Column table class with the updated properties.
        */
        public ColumnModel(Rubric existingRubric, Column column)
        {
            ExistingRubric = existingRubric;
            Column = column;
        }

        /**
         * @author Rowen Zaal
         * Gets the ExistingRubric property.
         * @returns the existing rubric from the database.
        */
        public Rubric GetExistingRubric()
        {
            return ExistingRubric;
        }

        /**
         * @author Rowen Zaal
         * Retrieves an existing column from the existing rubric based on the position of the column.
         * @returns the existing column from the existing rubric by looking at the column position, or null if not found.
        */
        public Column? GetExistingColumn()
        {
            return ExistingRubric.Columns?.FirstOrDefault(c => c.Position == Column.Position);
        }

        /**
         * @author Rowen Zaal
         * Makes a new list of Column when the ExistingRubric.Columns is null.
        */
        public void MakeNewListOfColumn()
        {
            ExistingRubric.Columns ??= new List<Column>();
        }
    }
}
