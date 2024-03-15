using System.Net.Mail;

namespace APlus.Business.Models
{
    public class EmailModel
    {
        private string Email { get; set; }

        /**
         * @author Rowen Zaal
         * Creates a new instance of the EmailModel class.
         * @param email the user's email address.
        */
        public EmailModel(string email)
        {
            Email = email;
        }

        /**
         * @author Rowen Zaal
         * Gets the Email property.
         * @returns the Email property containg a string.
        */
        public string GetEmail()
        {
            return Email;
        }

        /**
         * @author Rowen Zaal
         * Checks for a valid email address.
         * Email requirements:
         - Must contain ' @ '.
         - Must contain text before ' @ '.
         - Must contain text after ' @ '.
         * @throws InvalidInputException when the regex doesn't match the given Email.
        */
        public void Validate()
        {
            try
            {
                MailAddress validateEmail = new(Email);
                bool validEmail = validateEmail.Address == Email;
            }
            catch
            {
               throw new InvalidInputException("Invalid input");
            }
        }
    }
}
