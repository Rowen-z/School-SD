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
         * Saves the rubric into the database.
         * @param rubric is a Rubric table class with the properties from the request.
         * @returns an integer of database changes to the RubricService.
        */
        public async Task<int> SaveRubricInDatabase(Rubric rubric)
        {
            _context.Rubrics.Add(rubric);
            return await _context.SaveChangesAsync();
        }
    }
}
