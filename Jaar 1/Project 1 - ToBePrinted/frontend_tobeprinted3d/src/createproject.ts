/**
 * This function validates the input of the project title, to avoid unnessicairy entries.
 * it compares the given value to the Regex string provided to the input field and returs true when it does.
 * -Sven
 */
function storeProjectData(): void {
    if (validateInput() === true) {
        localStorage.setItem((<HTMLInputElement>document.getElementById("projectTitle")).value, JSON.stringify({
            "projectTitle": (<HTMLInputElement>document.getElementById("projectTitle")).value,
            "projectGoal": (<HTMLInputElement>document.getElementById("projectGoal")).value,
            "projectEndTime": +new Date + ((document.getElementById("projectTime") as HTMLInputElement).valueAsNumber * 1000 * 86400),
            "projectDescription": (<HTMLInputElement>document.getElementById("projectDescription")).value,
            "projectImage": (<HTMLInputElement>document.getElementById("projectImage")).value,
            "projectRaised": "0",
            "projectDonators": "0",
            
            
        }))
        return;
    }
    else
        return;
}
/**
 * This function validates the input of the project title, to avoid unnessicairy entries.
 * it compares the given value to the Regex string provided to the input field and returs true when it does.
 * -Sven
 */
function validateInput() {
    const inputText = (<HTMLInputElement>document.getElementById("projectTitle")).value;
    var validateString = "^[a-zA-Z1-9].*";
    if (inputText.match(validateString)) {
        return true;
    }
    else return false;
}

/**
 * This function initiates the code to start creating an project.
 * -Sven
 */
function initproject(): void {
    document.getElementById("submitproject")?.addEventListener("click", storeProjectData)
}
initproject();