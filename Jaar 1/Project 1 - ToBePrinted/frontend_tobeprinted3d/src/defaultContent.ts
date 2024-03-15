import { CreateHTMLelements } from "./createHTMLelements.js";

/**
 * @author Anish Raghoenath <anish.raghoenath@hva.nl>
 * Standard header for each page
 */

/**
 * initializes the header
 */
function initPage(): void {
    createHeader();
    createFooter();
}
initPage();

/**
 * flow to create the header
 */
function createHeader(): void {
    const header = document.querySelector('header') as HTMLElement;
    createHomeSection(header);
    createSearchBarSection(header);
    createAccountSection(header);
}

/**
 * creates the links in the footer
 */
function createFooter(): void {
    const footer: HTMLElement = document.querySelector('footer') as HTMLElement;
    const faq: HTMLAnchorElement = CreateHTMLelements.createAnchorElement("faq", footer, "./faq.html");
    faq.textContent = "FAQ";
    const termsAndConditions: HTMLAnchorElement = CreateHTMLelements.createAnchorElement("termsAndConditions", footer, "./termsandconditions.html");
    termsAndConditions.textContent = "Terms and Condidtions";
    const contactUs: HTMLAnchorElement = CreateHTMLelements.createAnchorElement("contactUs", footer, "./contactus.html");
    contactUs.textContent = "Contact Us";
    createExtraLinksSection(footer);
}

/**
 * 
 * @param elementId the id of the anchor element that has to be created
 * @param parentElement the element that will be the parent of the created anchor element
 * @param hrefPath the path to the hypertext refrence of the anchor element
 * @param sourcePath the path to the source of the image
 * @param anchorText the text that will be a textnode of an anchor element
 */
function createIconSection(elementId: string, parentElement: HTMLElement, hrefPath: string, sourcePath: string, anchorText: string): void {
    const aElement = CreateHTMLelements.createAnchorElement(elementId, parentElement, hrefPath);
    CreateHTMLelements.createImageElement(sourcePath, aElement);
    aElement.appendChild(document.createTextNode(anchorText));
}

/**
 * Creates the section with the logo and name.
 * Will redirect to the homepage if clicked on
 * @param header the header of the page
 */
function createHomeSection(header: HTMLElement): void {
    const homeSection = CreateHTMLelements.createSectionElement("home", header);
    createIconSection("logo", homeSection, "./index.html", "./assets/logo_TBD.png", "ToBePrinted");
}

/**
 * Creates a section with an input field and searchbutton
 * @param header the header of the page
 */
function createSearchBarSection(header: HTMLElement): void {
    const searchBarSection = CreateHTMLelements.createSectionElement("searchBar", header);
    const inputElement = document.createElement("input");
    inputElement.placeholder = "Search...";
    const aElement = CreateHTMLelements.createAnchorElement("search", searchBarSection, "#");
    CreateHTMLelements.createImageElement("./assets/magnify-glass-icon.svg", aElement);
    searchBarSection.appendChild(inputElement);
    searchBarSection.appendChild(aElement);
}

/**
 * Creates a section with the links avaiable to people who are logged in
 * @param accountSection the section which holds the account options
 */
function createLoggedInSection(accountSection: HTMLElement) {
    const loggedInSection = CreateHTMLelements.createSectionElement("loggedIn", accountSection);
    createIconSection("create", loggedInSection, "./createproject.html", "./assets/plus-icon.svg", "Create");
    createIconSection("profile", loggedInSection, "./profilepage.html", "./assets/account-icon.svg", getUserName());
}

/**
 * Creates a section with the links avaiable to people who are logged out
 * @param accountSection the section which holds the account options
 */
function createLoggedOutSection(accountSection: HTMLElement) {
    const loggedOutSection = CreateHTMLelements.createSectionElement("loggedOut", accountSection);
    const joinButton = CreateHTMLelements.createAnchorElement("joinButton", loggedOutSection, "./createaccount.html");
    const loginButton = CreateHTMLelements.createAnchorElement("loginButton", loggedOutSection, "./login.html");
    joinButton.textContent = "Join";
    loginButton.textContent = "Login";
}

function createExtraLinksSection(footer: HTMLElement): void {
    CreateHTMLelements.createAnchorElement("projectoverzicht", footer, "./projectsoverzicht.html").textContent = "Project overzicht";
    CreateHTMLelements.createAnchorElement("adminaccountoverview", footer, "./adminAccountOverview.html").textContent = "Admin account overview";
}

/**
 * Creates a section with the logged in functionality and the logged out functionality depending if the user is logged in
 * @author Rowen
 * @param header the header of the page
*/
function createAccountSection(header: HTMLElement): void {
    const accountSection = CreateHTMLelements.createSectionElement("account", header);
    if (getUserName() !== undefined) {
        const hideLogout: HTMLElement | null = document.getElementById("loggedOut");
        if (hideLogout !== null){
            hideLogout.classList.add("hide");
        }
        createLoggedInSection(accountSection);
        return;
    }
    else {
        const hideLogin: HTMLElement | null = document.getElementById("loggedIn");
        if (hideLogin !== null){
            hideLogin.classList.add("hide");
        }
        createLoggedOutSection(accountSection);
        return;
    }
}
/**
 * Function that gets username
 * @author Rowen
 * @returns the username of the user from the cookie storage
 */
function getUserName(): string {
    let cookie = document.cookie;
    const valueOfCookies = cookie.split('; ').find((row) => row.startsWith('displayNaam='))?.split('=')[1]!;
    return valueOfCookies;
}