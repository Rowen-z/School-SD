/**
 * @author Sven Molenaar
 * ContactForm Functionality
 */


/**
 * prevents the page from reloading after the submit button is pressed.
 * then loads the contactValues as an array for use with the server request
 * after the results come back from the server
 * the code checks if the return statement is valid and activates 1 of the two functions
 * @param SubmitEvent listens to submit event
 */
async function requestContactValues(ev: SubmitEvent) {
  ev.preventDefault();
  let contactValues: [string, string, string, string] = createContactValues();
  const getContactValuesRequest = makeGetContactValuesRequest(contactValues[0], contactValues[1], contactValues[2], contactValues[3])
  const getContactValuesResponse = await fetch(getContactValuesRequest);
  const contactResults = await getContactValuesResponse.json();
  if (contactResults === "Succes") {
    succesForm();
  }
  else {
    errorForm();
  }
}

/**
 * gets the input from the user
 * @returns the contactvalues as an collection of strings
 */
function createContactValues(): [string, string, string, string] {
  const contactName = (<HTMLInputElement>document.getElementById("contactName")).value;
  const contactSubject = (<HTMLInputElement>document.getElementById("contactSubject")).value;
  const contactEmail = (<HTMLInputElement>document.getElementById("contactEmail")).value;
  const contactMessage = (<HTMLInputElement>document.getElementById("contactMessage")).value;
  return [contactName, contactSubject, contactEmail, contactMessage]
}

/**
 * sends an request to the server with values
 * @param contactName String with the contact name
 * @param contactSubject String with the contact subject
 * @param contactEmail String with the contact email
 * @param contactMessage String with the contact message
 * @returns an request containing an string
 */
function makeGetContactValuesRequest(contactName: string, contactSubject: string, contactEmail: string, contactMessage: string): Request {
  const req = new Request("http://localhost:3000/createcontactform", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": contactName,
      "subject": contactSubject,
      "email": contactEmail,
      "message": contactMessage
    })
  })
  return req
}

/**
 * removes the noError class from an <p> element and replaces it with an succes class to show the user that the submission was succesfull and
 * redirects the user to an new page
 */
function succesForm(): void {
  const pElement = document.getElementById("validationParagraph") as HTMLParagraphElement;
  pElement.classList.remove("noError")
  pElement.classList.add("succes")
  pElement.textContent = "Your Form has been Submitted Succesfully, You will be redirected soon"
  setTimeout(() => {
    window.location.href = "./contactus.html";
  }, 5000)
}

/**
 * removes the noError class from an <p> element and replaces it with an error class to show the user that they have made an mistake.
 */
function errorForm(): void {
  const pElement = document.getElementById("validationParagraph") as HTMLParagraphElement;
  pElement.classList.remove("noError")
  pElement.classList.add("error")
  pElement.textContent = "Your request has not been submitted, please check if the filled fields are correct"
}

/**
 * removes the noError and error classes from an <p> element and clears the innertext to clear the error message output
 */
function resetButton(): void {
  const pElement = document.getElementById("validationParagraph") as HTMLParagraphElement;
  pElement.classList.remove("noError")
  pElement.classList.remove("error")
  pElement.textContent = ""
}

/**
 * initiates the submit button and reset button to listen for activation.
 * if the submit button gets activated, it will start the contactValues request
 * if the reset button gets activated, it will start the reset form function
 */
function initContactForm(): void {
  const contactForm = <HTMLFormElement>document.getElementById("contactForm");
  const resetButtonElement = <HTMLButtonElement>document.getElementById("resetForm");
  contactForm.addEventListener("submit", requestContactValues);
  resetButtonElement.addEventListener("click", resetButton)
  window.addEventListener("unhandledrejection", errorForm)
}

initContactForm();

// window.addEventListener("unhandledrejection", errorRequest)

// function errorRequest():void {
//   const pElement = document.getElementById("incorrectLogin") as HTMLElement;
//   pElement.classList.remove("noError")
//   pElement.classList.add("error")
//   pElement.textContent = "Your request has not been submitted, please check if the filled fields are correct and try again"
// }

    // CREATE TABLE `contactform` (
    //   `messageid` int NOT NULL AUTO_INCREMENT,
    //   `name` varchar(255) NOT NULL,
    //   `email` varchar(255) NOT NULL,
    //   `subject` varchar(255) NOT NULL,
    //   `message` text NOT NULL,
    //   `postdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //   `readstate` bit(1) default 0,
    //   primary key(`messageid`)
    //   )
