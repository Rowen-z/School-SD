using System.ComponentModel.DataAnnotations;

namespace APlus.Business.DTOs
{
    /**
     * @author Rowen Zaal
     * Data Transfer Object used for the rubric containing the properties of a column.
     * @param Title contains a string of text with a minimum length of 0 and a maximum length of 127.
     * @param Position contains the position of a column with a minimum range of 0 and a maximum range of 99e.
     * @param Cells is a list of all the cells in the column.
    */
    public class ColumnDTO
    {
        [Required(AllowEmptyStrings = true, ErrorMessage = "Invalid column title"), StringLength(127, ErrorMessage = "Invalid column title")]
        public string Title { get; set; } = string.Empty;

        [Range(0, 99, ErrorMessage = "Invalid column position")]
        public int Position { get; set; }
        public List<CellDTO>? Cells { get; set; }
    }
}