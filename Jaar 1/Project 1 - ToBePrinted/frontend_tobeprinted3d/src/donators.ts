/**
* @author Rowen
* @param
* @returns
*/

interface Donator {
    username: string,
    amount: string
}

/**
 * Clicking on 'Donate now' button activates function. It checks if input is a number & if input is 1 or above. 
 */
function donateButton(): void {
    (document.getElementById("buttonTest") as HTMLButtonElement).addEventListener("click", defaultEvent => {
        if (donateInput() !== "NaN" && +donateInput() >= 1) {
            storeDonatorInDatabase();
            window.location.reload();
        } else {
            errorMessage();
        }
    })
}
donateButton();

/**
 * This function returns the amount of the user input.
 */
function donateInput(): string | number {
    const inputNumber = (document.getElementById("numberTest") as HTMLInputElement).valueAsNumber
    const finalNumber = inputNumber.toFixed(2);
    return finalNumber;
}

/**
 * This function displays an error message if the input amount is invalid.
 */
function errorMessage(): void {
    const messageElement = document.querySelector("section.donateNow section#messageOutput") as HTMLOutputElement;
    if (messageElement?.children.length > 0) {
        messageElement?.removeChild(messageElement.lastChild as Node);
    }
    const messageOutput = document.createElement('p') as HTMLElement;
    messageOutput.classList.add("error");
    messageOutput.innerText = "Enter a valid amount";
    messageElement?.appendChild(messageOutput);
}

/**
 * If user is logged out, becomes 'Guest'.
 * @returns the username of the user from the cookie storage.
 */
function getUserName(): string {
    let cookie = document.cookie as string;
    let username = cookie.split('; ').find((row) => row.startsWith('displayNaam='))?.split('=')[1]! as string;
    if (username == undefined) {
        username = 'Guest';
    }
    return username;
}

/**
 * This function stores the username & input amount of the donator in the database.
 */
async function storeDonatorInDatabase(): Promise<void> {
    
    await fetch("http://localhost:3000/storedonator", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: getUserName(),
            amount: donateInput(),
            projectID: getProjectID()
        })
    })
}

/**
 * This function gets the 20 most recent donators from the database.
 */
async function getRecentDonators(): Promise<void> {
    const response = await fetch("http://localhost:3000/getrecentdonators", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            projectID: getProjectID()
        })
    })
    const data = await response.json() as Array<Donator>;
    displayNamesRecentDonator(data);
    displayAmountRecentDonator(data);
}
getRecentDonators();

/**
 * This function displays the names of the recent donators in an HTML-Output section.
 * @param data is an Array of the donators containing: username & amount.
 */
function displayNamesRecentDonator(data: Array<Donator>): void {
    const nameElement = document.querySelector("section.recentDonators section#nameOutput") as HTMLOutputElement;
    for (let i: number = 0; i < data.length; i++) {
        const nameOutput = document.createElement('p');
        nameOutput.innerText = data[i].username;
        nameElement.append(nameOutput);
    }
}

/**
 * This function displays the amount of the recent donators in an HTML-Output section.
 * @param data is an Array of the donators containing: username & amount.
 */
function displayAmountRecentDonator(data: Array<Donator>): void {
    const amountElement = document.querySelector("section.recentDonators section#amountOutput") as HTMLOutputElement;
    for (let i: number = 0; i < data.length; i++) {
        const amountOutput = document.createElement('p') as HTMLElement;
        amountOutput.innerText = `€${data[i].amount}`;
        amountElement.append(amountOutput);
    }
}

/**
 * This function gets the 10 top donators from the database.
 */
async function getTopDonators(): Promise<void> {
    const response = await fetch("http://localhost:3000/gettopdonators", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            projectID: getProjectID()
        })
    })
    const data = await response.json() as Array<Donator>;
    displayRankNumbers();
    displayNamesTopDonator(data);
    displayAmountTopDonator(data);
}
getTopDonators();

/**
 * This function displays the rank numbers in an HTML-Output section.
 */
function displayRankNumbers(): void {
    const rankElement = document.querySelector("section.topDonators section#rankOutput") as HTMLOutputElement;
    for (let i: number = 1; i <= 10; i++) {
        const rankNumber = `#${i}`;
        const rankOutput = document.createElement('p') as HTMLElement;
        rankOutput.innerText = rankNumber;
        rankElement?.append(rankOutput);
    }
}

/**
 * This function displays the names of the top donators in an HTML-Output section.
 * @param data is an Array of the donators containing: username & amount.
 */
function displayNamesTopDonator(data: Array<Donator>): void {
    const nameElement = document.querySelector("section.topDonators section#nameOutput") as HTMLOutputElement;
    for (let i: number = 0; i < data.length; i++) {
        const nameOutput = document.createElement('p') as HTMLElement;
        nameOutput.innerText = data[i].username;
        nameElement.append(nameOutput);
    }
}

/**
 * This function displays the amount of the top donators in an HTML-Output section.
 * @param data is an Array of the donators containing: username & amount.
 */
function displayAmountTopDonator(data: Array<Donator>): void {
    const amountElement = document.querySelector("section.topDonators section#amountOutput") as HTMLOutputElement;
    for (let i = 0; i < data.length; i++) {
        const amountOutput = document.createElement('p') as HTMLElement;
        amountOutput.innerText = `€${data[i].amount}`;
        amountElement.append(amountOutput);
    }
}

/**
 * @author Sven Molenaar
 * If user donates to an project, it gets added to that projectID
 * @returns the projectnumber of the current page
 */
function getProjectID():Number{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectNumber: number = Number(urlParams.get('project'));
return projectNumber
}