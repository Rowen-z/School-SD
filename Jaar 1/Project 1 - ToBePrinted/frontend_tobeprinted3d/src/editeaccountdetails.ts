import { CreateHTMLelements } from "./createHTMLelements.js";

/**
 * This function get's the account details from the database.
 * @author Casper Driessen
 */
async function getAccountDetails() {
  const detailRequest = makeDetailRequest();

  const accountDetailsResponse = await fetch(detailRequest);
  console.log(accountDetailsResponse)

  const accountDetails = await accountDetailsResponse.json();
  console.log(accountDetails)
  showAccountDetails(accountDetails[0]);
}
getAccountDetails();

type AccountDetails = {
  userId: string;
  display_naam: string;
  email: string;
  voornaam?: string;
  tussenvoegsels?: string;
  achternaam?: string;
  woonplaats?: string;
  straatnaam?: string;
  huisnummer?: number;
  postcode?: string;
  telefoonnummer?: string;
  geboortedatum?: string;
  bankrekening?: string;
  beschrijving?: string;
}

/**
 * This function displays account details in the input fields.
 * @author Rowen Zaal
 * @param accountDetails are the details from the database.
 */
function showAccountDetails(accountDetails: AccountDetails): void {
  const output = <HTMLOutputElement>document.getElementById("editAccountOutput");
  createSections(accountDetails, output);
  updateAccountSection(output);
}

/**
 * This function creates all the input fields
 * @author Rowen Zaal
 * @param accountDetails are the details from the database.
 * @param output is the output section in the HTML code.
 */
function createSections(accountDetails: AccountDetails, output: HTMLOutputElement) {
  CreateHTMLelements.createSectionAccount(output, "userNameSection", "Username: ", accountDetails.display_naam);
  CreateHTMLelements.createSectionAccount(output, "emailSection", "Email: ", accountDetails.email);
  CreateHTMLelements.createSectionAccount(output, "firstNameSection", "First Name: ", accountDetails.voornaam);
  CreateHTMLelements.createSectionAccount(output, "prefixSection", "Prefix: ", accountDetails.tussenvoegsels);
  CreateHTMLelements.createSectionAccount(output, "lastNameSection", "Last Name: ", accountDetails.achternaam);
  CreateHTMLelements.createSectionAccount(output, "citySection", "City: ", accountDetails.woonplaats);
  CreateHTMLelements.createSectionAccount(output, "streetNameSection", "Streetname: ", accountDetails.straatnaam);
  CreateHTMLelements.createSectionAccount(output, "houseNumberSection", "House number: ", accountDetails.huisnummer);
  CreateHTMLelements.createSectionAccount(output, "zipCodeSection", "Zip code: ", accountDetails.postcode);
  CreateHTMLelements.createSectionAccount(output, "phoneNumberSection", "Phone number: ", accountDetails.telefoonnummer);
  CreateHTMLelements.createSectionAccount(output, "birthDateSection", "Birth date (YYYY-MM-DD): ", accountDetails.geboortedatum?.split('T')[0]);
  CreateHTMLelements.createSectionAccount(output, "bankAccountSection", "Bank account: ", accountDetails.bankrekening);
  CreateHTMLelements.createSectionAccount(output, "descriptionSection", "Description: ", accountDetails.beschrijving);
}

/**
 * This function creates the update account button.
 * @author Rowen Zaal
 * @param output is the output section in the HTML code.
 */
function updateAccountSection(output: HTMLOutputElement): void {
  const updateAccountSection = CreateHTMLelements.createSectionElement("updateAccountSection", output);
  const updateAccountButton = CreateHTMLelements.createButtonElement("updateAccountButton", updateAccountSection, "Update");
  updateAccountButton.setAttribute("id", "updateButton");
  updateAccountButton.addEventListener("click", messageOutput);
}

/**
 * This function creates a message when clicking on the update button.
 * @author Rowen Zaal
 */
function messageOutput(): void {
  const messageElement = document.getElementById("editAccountOutput") as HTMLOutputElement;
  if (messageElement?.children.length > 0) {
    messageElement?.removeChild(messageElement.lastChild as Node);
  }
  const messageOutput = document.createElement('p') as HTMLElement;
  messageOutput.innerText = "Account details updated";
  messageElement?.appendChild(messageOutput);
  changeAccountDetails();
}

/**
 * This function get's the total input fields and their values
 * @author Rowen Zaal
 */
async function changeAccountDetails(): Promise<void> {
  const inputFields = document.querySelectorAll("input");
  let values = [];

  for (let i = 0; i < inputFields.length; i++) {
    values.push(inputFields[i].value);
  }
  const changeDetailsRequest = makeChangeAccountDetailsRequest(values);
  const changeDetailsResponse = await fetch(changeDetailsRequest);
  const changeDetails = await changeDetailsResponse.json();
}

/**
 * This function makes a PUT request to the backend with the values of the input fields.
 * @author Rowen Zaal
 * @param values are the values of the input fields
 */
function makeChangeAccountDetailsRequest(values: string[] | number[]): Request {
  const request = new Request("http://localhost:3000/changeaccountdetails", {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "userId": `8`,
      "userName": `${values[1]}`,
      "email": `${values[2]}`,
      "firstName": `${values[3]}`,
      "prefix": `${values[4]}`,
      "lastName": `${values[5]}`,
      "city": `${values[6]}`,
      "streetName": `${values[7]}`,
      "houseNumber": `${values[8]}`,
      "zipCode": `${values[9]}`,
      "phoneNumber": `${values[10]}`,
      "birthDate": `${values[11]}`,
      "bankAccount": `${values[12]}`,
      "description": `${values[13]}`
    })
  })
  return request
}

/**
 * This function makes a POST request to the backend to get the user details.
 * @author Rowen Zaal
 */
function makeDetailRequest(): Request {
  const request = new Request("http://localhost:3000/getaccountdetails", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "userId": `8`
    })
  })
  return request
}