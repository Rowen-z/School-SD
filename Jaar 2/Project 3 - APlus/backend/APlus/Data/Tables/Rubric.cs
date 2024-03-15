namespace APlus.Data.Tables
{
    /**
     * @author Rowen Zaal
     * Database table Rubrics
     * @param Id the Id of a rubric.
     * @param Title the title of a rubric.
     * @param Year the assigned year of a schoolclass.
     * @param UserNumber is the usernumber of the teacher/admin that created the rubric.
     * @param Columns defines the relationship between Rubric and Column.
     * @param User defines the relationship between Rubric and User.
    */
    public class Rubric
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Year { get; set; }
        public long UserNumber { get; set; }
        public List<Column>? Columns { get; set; }
        public User? User { get; set; }
    }
}
