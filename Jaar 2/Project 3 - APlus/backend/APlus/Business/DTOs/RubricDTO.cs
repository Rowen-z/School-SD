using System.ComponentModel.DataAnnotations;

namespace APlus.Business.DTOs
{
    /**
     * @author Rowen Zaal
     * Data Transfer Object used for the rubric containing the properties of a rubric.
     * @param Title contains a string of text with a minimum length of 2 and a maximum length of 31.
     * @param Year contains a number that's signed to a classyear with a minimum range of 1 and a maximum range of 2.
     * @param Columns is a list of all the columns in the rubric.
    */
    public class RubricDTO
    {
        [Required(ErrorMessage = "Invalid rubric title"), StringLength(31, MinimumLength = 2, ErrorMessage = "Invalid rubric title")]
        public string Title { get; set; } = string.Empty;
        
        [Range(1, 2, ErrorMessage = "Invalid year")]
        public int Year { get; set; }
        public List<ColumnDTO>? Columns { get; set; }
    }
}