namespace APlus.Repository.RubricRepository
{
    /**
     * @author Rowen Zaal
     * Interface containing the methods of the RubricRepository.
    */
    public interface IRubricRepository
    {
        Task<int> SaveRubricInDatabase(Rubric rubric);
    }
}
