using APlus.Business.RubricService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APlus.Controllers
{
    [Route("rubrics")]
    [ApiController]
    public class RubricController : Controller
    {
        private readonly IRubricService _rubricService;

        /**
         * @author Rowen Zaal
         * Constructor containing the Interface of the RubricService.
         * @param rubricService is the Interface of the RubricService.
        */
        public RubricController(IRubricService rubricService)
        {
            _rubricService = rubricService;
        }

        /**
         * @author Rowen Zaal
         * A HttpPost request used for creating a rubric. Only the roles ADMIN & TEACHER can acces this request.
         * @param rubricDTO contains the properties defined in the RubricDTO model.
         * @returns status200("Rubric creation successful") if no errors occured during the proces.
        */
        [HttpPost, Authorize(Roles = "ADMIN,TEACHER")]
        public async Task<IActionResult> CreateRubric(RubricDTO rubricDTO)
        {
            string userNumber = User.Identity!.Name!;
            long convertedUserNumber = long.Parse(userNumber);

            await _rubricService.CreateRubric(rubricDTO, convertedUserNumber);

            return Ok(new { message = "Rubric creation successful" });
        }
    }
}
