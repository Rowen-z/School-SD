namespace APlus.Business.RubricService
{
    /**
     * @author Rowen Zaal
     * Interface containing the methods of the RubricService.
    */
    public interface IRubricService
    {
        Task CreateRubric(RubricDTO rubricDTO, long userNumber);
        Task UpdateRubric(RubricDTO rubricDTO, int rubricId);
    }
}
