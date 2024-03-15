/**
 * This function initializes on startup, and waits untill the donate button gets pressed
 * @author Sven Molenaar
 */
function init(): void {
    const btn = (<HTMLButtonElement>document.getElementById('donateButton'));
    btn.addEventListener('click', start);
}

/**
 * This function starts the code
 */
function start(): void {
    getDonations()
    getDonators()
    getTime()
}

/**
 * This function gets the values needed for the donations display
 * @author Sven Molenaar
 * Has created the key obtain and return code,
 * and the entire donation amount code
 */
function getDonations(): void {
    const chosenProject = (<HTMLInputElement>document.getElementById("projectSelectField")).value;
    const amountDonated = (<HTMLInputElement>document.getElementById("amountDonated")).valueAsNumber;
    const projectChosen = JSON.parse(localStorage.getItem(chosenProject) as string);
    const oldAmountRaised = parseFloat(projectChosen.projectRaised)
    const newAmountRaised = amountDonated + oldAmountRaised;
    projectChosen.projectRaised = String(newAmountRaised.toFixed(2));
    localStorage.setItem(chosenProject, JSON.stringify(projectChosen));
    const display = (<HTMLParagraphElement>document.getElementById("displayAmount"));
    display.innerHTML = "Total amount donated:" + projectChosen.projectRaised;
}

/**
 * This function gets the values needed for the donator display
 * @author Sven Molenaar
 * Has created the key obtain and return code
 * @author Deniz Arik 
 * Has helped with compiling the donator count function 
 */
function getDonators(): void {
    const chosenProject = (<HTMLInputElement>document.getElementById("projectSelectField")).value;
    const projectChosen = JSON.parse(localStorage.getItem(chosenProject) as string);
    const oldAmountDonators = projectChosen.projectDonators;
    const newAmountDonators = 1 + parseInt(oldAmountDonators);
    projectChosen.projectDonators = String(newAmountDonators);
    localStorage.setItem(chosenProject, JSON.stringify(projectChosen));
    const display = (<HTMLParagraphElement>document.getElementById("donatorOutput"));
    display.innerHTML = "Total amount of donators:" + projectChosen.projectDonators
}

/**
 * This function gets the values needed for the time display function
 * @author Sven Molenaar
 * Has created the key obtain and return code
 */
function getTime(): void {
    const chosenProject = (<HTMLInputElement>document.getElementById("projectSelectField")).value;
    const projectChosen = JSON.parse(localStorage.getItem(chosenProject) as string);
    const projectTime = projectChosen.projectEndTime;
    creatIntervalFunction(projectTime);
}

/**
   * This function displays total time left
   * @author Rowan Zaal
   * Has created the entire timer countdown function
   * with the help of @author Anish
   */
function creatIntervalFunction(projectTime: number): void {
    const setIntervalFunct = setInterval(function (): void {
        const remaining = (projectTime - +new Date) / 1000;
        const output = (<HTMLElement>document.getElementById("timerOutput"));
        if (remaining >= 0) {
            const seconds = Math.floor(remaining % 60);
            const minutes = Math.floor((remaining / 60) % 60);
            const hours = Math.floor((remaining / 3600) % 24);
            const days = Math.floor((remaining / 86400));
            output.textContent = `Time left: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        }
        else {
            output.textContent = 'Time is over';
            clearInterval(setIntervalFunct);
        }
        console.log("Im Still Counting")
    }, 100);
}
init();