using APlus.Business.UserService;
using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;

namespace APlus.Controllers
{
    [Route("users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        /**
         * @author Rowen Zaal
         * Constructor containing the Interface of the UserService.
         * @param userService is the Interface of the UserService.
        */
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /**
         * @author Rowen Zaal
         * A HttpPost request used for the login functionality.
         * @param request contains the properties defined in the LoginDTO model (email, password).
         * @returns status200 "Login succesful" if no errors occured during the proces.
         * @returns status400 "Invalid input" if InvalidInputException got thrown.
         * @returns status401 "Invalid credentials" if InvalidCredentialsException got thrown.
        */
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO request)
        {
            try
            {
                string JsonWebToken = await _userService.Login(request.Email, request.Password);

                CookieOptions cookieOptions = new()
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddDays(7)
                };

                Response.Cookies.Append("token", JsonWebToken, cookieOptions);

                return Ok(new { message = "Login successful" });
            }
            catch (InvalidCredentialException invalidCredentialsException)
            {
                return Unauthorized(new { error = invalidCredentialsException.Message });
            }
            catch (InvalidInputException invalidInputException)
            {
                return BadRequest(new { error = invalidInputException.Message });
            }
        }
    }
}
