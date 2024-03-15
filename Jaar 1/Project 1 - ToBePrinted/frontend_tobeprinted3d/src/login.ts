/**
 * @author Anish Raghoenath <anish.raghoenath@hva.nl>
 * Login functionality
 */
function initLogin() {
    (document.getElementById("submitLoginButton") as HTMLButtonElement).addEventListener("click", async defaultEvent => {
        const hasInput = checkInput(defaultEvent);
        if (hasInput) {
            const loginInfo = getInput();
            const accountInfo = await requestToServer(loginInfo);
            redirectToProfile(accountInfo.display_naam); 
        }
    })
}
initLogin();

/**
 * gets the input from the user
 * @returns the username and password of the user
 */
function getInput(): string[] {
    const username = (document.getElementById("username") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value
    return [username, password];
}

/**
 * Checks the input and prevents the form from submitting if they are both filled in.
 * @param defaultEvent mouseEvent when the user has clicked
 * @returns says if both functions are filled in
 */
function checkInput(defaultEvent: Event) {
    const [username, password] = getInput()
    const hasInput = username !== "" && password !== ""
    if (hasInput) {
        defaultEvent.preventDefault();
    }
    return hasInput;
}

/**
 * Sends a request to the server to get data.
 * @param loginInfo The username and password saved in a string.
 * @returns the first row of data fetched from the backend
 */
async function requestToServer(loginInfo: string[]) {
    const response = await fetch(`http://127.0.0.1:3000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: loginInfo[0],
            password: loginInfo[1]
        })
    })
    const data = await response.json();
    checkData(data); 
    return data[0]
}

/**
 * Checks if the data was send back correctly
 * Gives an errormessage when gotten an incorrect combination.
 * @param data the data fetched from the backend
 */
function checkData(data: []) {
    console.log(typeof data, data)
    const pElement = document.getElementById("incorrectLogin") as HTMLElement;
    if (data.length === 0) {
        pElement.classList.remove("noError")
        pElement.classList.add("error")
    } else {
        pElement.classList.remove("error")
    }
}

/**
 * saves the displayName as a cookie
 * creates a popup
 * redirects the user to the profile page
 * @param displayName the displayName of the user
 */
function redirectToProfile(displayName: object) {
    document.cookie = `displayNaam=${displayName}`
    createPopup();
    setTimeout(() => {
        window.location.href = "./profilepage.html";
    }, 2000)
}

function createPopup() {
    const popUpBackground = document.createElement('section');
    popUpBackground.id = "popUpBackground";
    const popUp = document.createElement('section');
    popUp.id = "popUp";
    popUp.textContent = "You will be redirected to your profile page";
    popUpBackground.appendChild(popUp);
    document.body.appendChild(popUpBackground);
}