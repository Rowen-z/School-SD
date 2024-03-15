/**
 * @author: Casper Driessen
 */

/**
 * This function creates an account.
 * It starts by preventing the default form behaviour.
 * Then if no accounts exist in local storage, insert an empty object to store the accounts in later.
 * Then all needed values are stored in constants.
 * Then checks if all values are valid.
 * If all values are valid, create an object with new the new accounts.
 * Merge all accounts with the new account using desctructuring.
 * Store this into local storage and link to the account created page.
 */

function createAccount2(ev: SubmitEvent): void {
    ev.preventDefault();
    const username = <HTMLInputElement>document.getElementById("username");
    const email = <HTMLInputElement>document.getElementById("email");
    const password = <HTMLInputElement>document.getElementById("password");

    const req = new Request("http://localhost:3000/createaccount", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "login_naam": `${username.value}`,
            "accountpassword": `${password.value}`,
            "email": `${email.value}`,
            "display_naam":`${username.value}`
        })
    })
    console.log(req);
    fetch(req)
        .then((response) => response.json())
        .then(data => {
            if (data === "account added") {
                errorMessageSuccesCA()
            } else {
                errorMessageFailCA()
            }
            console.log(data)
        })
}

function createAccount(ev: SubmitEvent): void {
    ev.preventDefault();
    if (!localStorage.getItem("accounts")) {
        localStorage.setItem("accounts", JSON.stringify({}));
    }
    const username = <HTMLInputElement>document.getElementById("username");
    const email = <HTMLInputElement>document.getElementById("email");
    const password = <HTMLInputElement>document.getElementById("password");
    const accountsJSON = <string>localStorage.getItem("accounts");
    const accountsParsed = JSON.parse(accountsJSON);

    if (!checkValidity(password.value, username.value, email.value, accountsParsed)) {
        return;
    }
    const newAccount = {
        [username.value]: {
            id: incrementId(),
            email: email.value,
            password: password.value
        }
    }
    const updatedAccounts = { ...newAccount, ...accountsParsed }

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    window.location.href = "accountcreated.html";
}

/**
 * 
 * @param password String with the new password.
 * @param username String with the new username.
 * @param email String with the new email adress.
 * @param accounts An object with all accounts.
 * @returns If username, email and password are valid. Return true.
 */
function checkValidity(password: string, username: string, email: string, accounts: object): boolean {
    const validUsername = checkUsername(accounts, username);
    const validEmail = checkEmail(accounts, email);
    const validPassword = checkPassword(password);
    return (validUsername && validEmail && validPassword) ? true : false;
}

/**
 * 
 * @param accounts An object with all accounts.
 * @param username String with the new username.
 * @returns If a username is already in use, return false. Otherwise, return true.
 */
function checkUsername(accounts: object, username: string): boolean {
    let valid = true;
    const errorElement1 = <HTMLElement>document.getElementById("errorMessage1");
    if (accounts[username as keyof typeof accounts]) {
        errorElement1.innerText = "This username is already in use";
        valid = false;
    } else {
        errorElement1.innerText = "";
    }
    return valid;
}

/**
 * 
 * @param accounts An object with all accounts.
 * @param email String with the new email adress.
 * @returns If the email is already in use return false. Otherwise, return true.
 * 
 */
function checkEmail(accounts: object, email: string): boolean {
    let valid = true;
    let emailInUse = false;
    const errorElement2 = <HTMLElement>document.getElementById("errorMessage2");
    for (let key of Object.keys(accounts)) {
        if (accounts[key as keyof typeof accounts]["email"] === email) {
            errorElement2.innerText = "This email adress is already in use";
            valid = false;
            emailInUse = true;
        }
    }
    if (!emailInUse) {
        errorElement2.innerText = "";
    }
    return valid;
}

/**
 * 
 * @param password String with the new password.
 * @returns If the password is long enough and has a capital letter, return true. Otherwise, return false.
 */
function checkPassword(password: string): boolean {
    let valid = true;
    const errorElement3 = <HTMLElement>document.getElementById("errorMessage3");
    if (password.length < 8) {
        errorElement3.innerText = "This password is not long enough";
        valid = false;
    } else {
        errorElement3.innerText = "";
    }
    if (password.toLowerCase() === password) {
        errorElement3.innerText = "This password does not contain capital letters";
        valid = false;
    }
    return valid;
}

/**
 * Takes the id from the local storage and adds 1. Then return the id.
 * This is meant to replicate auto increment from databases.
 * If no id exists it creates one with value 0.
 * @returns The new id.
 */
function incrementId(): string {
    let value = localStorage.getItem("personId");
    if (value) {
        const currentScoreNumber = parseFloat(value) + 1;
        value = String(currentScoreNumber);
        localStorage.setItem("personId", value);
        return value;
    } else {
        localStorage.setItem("personId", "0");
        return "0";
    }
}

/**
 * Starts adds the eventlistener to the create account button.
 */
function initCreateAccount(): void {
    window.addEventListener("unhandledrejection", errorMessageFailCA);
    const form = <HTMLFormElement>document.getElementById("loginForm");
    form.addEventListener("submit", createAccount2);
}

initCreateAccount();

/**
 * @author Sven Molenaar 
 * removes the noError class from an <pre> element and replaces it with an error class to show the user that they have made an mistake
 */
function errorMessageFailCA(): void {
    const pElement = document.getElementById("validationParagraph") as HTMLPreElement;
    pElement.classList.remove("noError")
    pElement.classList.add("error")
    pElement.textContent = `Your request has not been submitted, \n please try again `
}

/**
 * @author Sven Molenaar 
 * removes the noError class from an <pre> element and replaces it with an succes class to show the user that they have succesfully created their account
 */
function errorMessageSuccesCA(): void {
    const pElement = document.getElementById("validationParagraph") as HTMLPreElement;
    pElement.classList.remove("noError")
    pElement.classList.add("succes")
    pElement.textContent = `Your account has been succesfully created , you will be redirected soon`
    setTimeout(() => {
        window.location.href = "./profilepage.html";
    }, 5000)
}


