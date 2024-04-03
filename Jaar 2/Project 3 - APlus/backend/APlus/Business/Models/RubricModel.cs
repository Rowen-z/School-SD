namespace APlus.Business.Models
{
    public class RubricModel
    {
        private RubricDTO RubricDTO { get; set; }
        private long UserNumber { get; set; }

        /**
         * @author Rowen Zaal
         * Creates a new instance of the RubricModel class including the userNumber.
         * @param rubricDTO is the RubricDTO model containing all properties from the request.
         * @param userNumber is the user number of an authorized user that sent the request.
        */
        public RubricModel(RubricDTO rubricDTO, long userNumber)
        {
            RubricDTO = rubricDTO;
            UserNumber = userNumber;
        }

        /**
         * @author Rowen Zaal
         * Creates a new instance of the RubricModel class.
         * @param rubricDTO the user's email address.
         * @param userNumber is the user number of an authorized user that sent the request.
        */
        public RubricModel(RubricDTO rubricDTO)
        {
            RubricDTO = rubricDTO;
        }

        /**
         * @author Rowen Zaal
         * Converts the RubricDTO to a Rubric data model.
         * @param rubricDTO is the RubricDTO model containing all properties of a rubric.
         * @param userNumber is the userNumber as a long of an authorized user that sent the request.
         * @returns a Rubric table class with the properties from the request.
        */
        public Rubric ConvertDtoToDataModel()
        {
            Rubric rubric = new()
            {
                Title = RubricDTO.Title,
                Year = RubricDTO.Year,
                UserNumber = UserNumber,
                Columns = RubricDTO.Columns?.Select(columnDTO => new Column
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
