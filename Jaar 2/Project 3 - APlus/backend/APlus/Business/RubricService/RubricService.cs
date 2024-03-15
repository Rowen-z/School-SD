using APlus.Repository.RubricRepository;

namespace APlus.Business.RubricService
{
    public class RubricService : IRubricService
    {
        private readonly IRubricRepository _rubricRepository;

        /**
         * @author Rowen Zaal
         * Constructor containing the Interface of the RubricRepository.
         * @param rubricRepository is the Interface of the RubricRepository.
        */
        public RubricService(IRubricRepository rubricRepository)
        {
            _rubricRepository = rubricRepository;
        }

        /**
         * @author Rowen Zaal
         * Converts the RubricDTO to a Rubric Table and awaits the RubricRepository to save it in the database.
         * @param rubricDTO is the RubricDTO model containing all properties of a rubric.
         * @param userNumber is the userNumber as a string of an authorized user that sent the request.
         * @returns an integer of database changes to the RubricController.
        */
        public async Task<int> CreateRubric(RubricDTO rubricDTO, long userNumber)
        {
            Rubric rubric = ConvertDtoToTable(rubricDTO, userNumber);

            return await _rubricRepository.SaveRubricInDatabase(rubric);
        }

        /**
         * @author Rowen Zaal
         * Converts the RubricDTO to a Rubric Table.
         * @param rubricDTO is the RubricDTO model containing all properties of a rubric.
         * @param userNumber is the userNumber as a long of an authorized user that sent the request.
         * @returns a Rubric table class with the properties from the request.
        */
        public Rubric ConvertDtoToTable(RubricDTO rubricDTO, long userNumber)
        {
            Rubric rubric = new()
            {
                Title = rubricDTO.Title,
                Year = rubricDTO.Year,
                UserNumber = userNumber,
                Columns = rubricDTO.Columns?.Select(columnDTO => new Column
                {
                    Title = columnDTO.Title,
                    Position = columnDTO.Position,
                    Cells = columnDTO.Cells?.Select(cellDTO => new Cell
                    {
                        Content = cellDTO.Content,
                        Position = cellDTO.Position
                    }).ToList()
                }).ToList()
            };

            return rubric;
        }
    }
}
