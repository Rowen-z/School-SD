namespace APlus.Business.RubricService
{
    /**
     * @author Rowen Zaal
     * Interface containing the methods of the RubricService.
    */
    public interface IRubricService
    {
        Task<int> CreateRubric(RubricDTO rubricDTO, long userNumber);

        Rubric ConvertDtoToTable(RubricDTO rubricDTO, long userNumber);
    }
}
