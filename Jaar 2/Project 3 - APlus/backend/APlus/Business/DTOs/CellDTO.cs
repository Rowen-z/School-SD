using System.ComponentModel.DataAnnotations;

namespace APlus.Business.DTOs
{
    /**
     * @author Rowen Zaal
     * Data Transfer Object used for the rubric containing the properties of a cell.
     * @param Content contains a string of text with a maximum length of 511.
     * @param Position contains the position of a cell with a minimum range of 1 and a maximum range of 99.
    */
    public class CellDTO
    {
        [Required(AllowEmptyStrings = true), StringLength(511, ErrorMessage = "Invalid cell content")]
        public string Content { get; set; } = string.Empty;

        [Range(1, 99, ErrorMessage = "Invalid cell position")]
        public int Position { get; set; }
    }
}