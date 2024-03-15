/**
 * @author: Casper Driessen
 * 
 * This script handles the changing of a password.
 */

/**
 * Adds an eventlistener to the change password form.
 */
function initChangePassword(): void {
    const form = <HTMLFormElement>document.getElementById("changePassword");
    form.addEventListener("submit", changePassword);
}


/**
 * Prevent default form behaviour.
 * Gets the values from the form and the localstorage.
 * If the given old password doesn't match password in storage, say this in the error field.
 * Else, clear the error and check if the new password meets password requirements.
 * If password requirements are met, change the password value in localstorage.
 * Then switch the change password form with a confirmation message.
 * @param ev SubmitEvent
 */
function changePassword(ev: SubmitEvent): void {
    ev.preventDefault();
    const username = <HTMLInputElement>document.getElementById("user");
    const oldPassword = <HTMLInputElement>document.getElementById("oldPassword");
    const password = <HTMLInputElement>document.getElementById("newPassword");
    const accountsJSON = <string>localStorage.getItem("accounts");
    const accounts = JSON.parse(accountsJSON);
    const errorElement2 = <HTMLElement>document.getElementById("errorMessage2");
    if (accounts[username.value]["password"] !== oldPassword.value) {
        errorElement2.innerText = "This password does not match with your username."
    } else {
        errorElement2.innerText = ""
        if (checkPasswordReqs(password.value)) {
            accounts[username.value]["password"] = password.value;
            localStorage.setItem("accounts", JSON.stringify(accounts));
            const passForm = <HTMLElement>document.getElementById("changeFormSection");
            passForm.innerHTML = "Password changed succesfully";
        }
    }
}

/**
 * This function checks if the password length is long enough and if the password contains capitalization.
 * @param password The new password.
 * @returns True if all requirements are met. Otherwise return false.
 */
function checkPasswordReqs(password:string):boolean{
    let valid = true;
    const errorElement3 = <HTMLElement>document.getElementById("errorMessage3");
    if (password.length < 8) {
        errorElement3.innerText = "This password is not long enough. It needs to be 8 or more characters.";
        valid = false;
    }
    if (password.toLowerCase() === password){
        errorElement3.innerText = "This password does not contain capital letters. Please use at least 1.";
        valid = false;
    }
    return valid;
}

initChangePassword()
