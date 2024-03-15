/**
 * @author Sven Molenaar
 * Page which displays various details from an selected project
 */



/**
 * A function that initiates on page load
 * It also starts the ProjectDataRequest Function
 */
async function initProjectInfoPage() {
    const projectRequest = getProjectDataRequest();
    const projectDetailsResponse = await fetch(projectRequest);
    const projectDetails = await projectDetailsResponse.json();

    const allDonatorRequest = getDonatorAmount();
    const allDonatorDetailsResponse = await fetch(allDonatorRequest);
    const allDonators = await allDonatorDetailsResponse.json();

    const allMoneyRequest = totalAmount();
    const allMoneyRequestResponse = await fetch(allMoneyRequest);
    const allMoney = await allMoneyRequestResponse.json();
    checkProject(projectDetails[0])
    initDisplays(projectDetails[0], allDonators[0], allMoney[0])
}
function initDisplays(projectDetails: projectDetails, allDonators: allDonators, allMoney: allMoney) {
    showMain(projectDetails, allDonators);
    showProgress(projectDetails, allMoney);
    showTimeLeft(projectDetails);
    showEndDate(projectDetails);
    showOtherValues(projectDetails);
}
initProjectInfoPage()
function checkProject(projectDetails: projectDetails) {
    if (projectDetails === undefined) {
        errorForm1()
        return
    } else {
        console.log("Succesfully Loaded Project 200")
        return
    }

}

/**
 * removes the noError class from an <p> element and replaces it with an error class to show the user that they have made an mistake.
 */
function errorForm1(): void {
    const pElement = document.getElementById("projectError") as HTMLHeadingElement;
    pElement.classList.remove("noError")
    pElement.classList.add("error")
    pElement.textContent = "Error 404, Page not found, Please check your url and try again"
}
/**
 * This interface predetermines the type of data which the key will contain
 * @interface projectDetails            An Interface Which Contains Various Project Details
 */
interface projectDetails {
    account_id: string,                 //The Creator Of The Project
    campaign_titel: string,             //The Project Title
    campaign_afbeelding: string,        //The Project Image Chosen By The Creator
    campaign_beschrijving: string,      //The Project Description
    donatie_goal: number,               //The Project Donation Goal   
    opgehaald_bedrag: number,           //The Amount Of Money The Project Has Collected
    eind_datum: string,                 //The Project`s End Date
    aantal_donaties: number,            //The Total Amount Of Donations An Project Has Recieved
    aantal_views: number                //The Total Amount Of Vieuws An Project Has Gathered
}

interface allDonators {
    totalDonators: number                //The Total Amount Of Donators To The Project
}
interface allMoney {
    totalMoney: number                   //The Total Amount Of Money Raised To The Project
}

/**
 * Displays the Title,Creator and Project Image
 * @param projectDetails Interface which contains various Project details
 * @param allDonators Interface which contains the TotalDonators Object
 */
function showMain(projectDetails: projectDetails, allDonators: allDonators): void {
    (<HTMLImageElement>document.getElementById("projectImage")).src = projectDetails.campaign_afbeelding;
    (<HTMLHeadingElement>document.getElementById("projectTitle")).textContent = projectDetails.campaign_titel;
    (<HTMLParagraphElement>document.getElementById("projectAuthor1")).innerText = `Created By: ${projectDetails.account_id}.`;
    (<HTMLParagraphElement>document.getElementById("projectViews")).innerText = `Viewed by :${projectDetails.aantal_views} People.`;
    (<HTMLParagraphElement>document.getElementById("projectDonators")).innerText = `Amount of Donators: ${allDonators.totalDonators}.`;
    return
}

/**
 * Displays various details of the project which show progression like Raised amount,Goal'
 * It also sets atributes to an progressbar 
 * @param projectDetails Interface which contains various Project details
 * @param allMoney Interface which contains the TotalMoney Object
 */
function showProgress(projectDetails: projectDetails, allMoney: allMoney): void {
    (<HTMLParagraphElement>document.getElementById("projectRaised")).innerText = `€${allMoney.totalMoney}`;
    (<HTMLParagraphElement>document.getElementById("projectGoal")).innerText = `€${projectDetails.donatie_goal}`;
    (<HTMLProgressElement>document.getElementById("projectProgress")).setAttribute("max", `${projectDetails.donatie_goal}`);
    (<HTMLProgressElement>document.getElementById("projectProgress")).setAttribute("value", `${allMoney.totalMoney}`);
}

/**
 * Creates an end date Constant value,
 * Calculates the time bewteen an project and its end date,
 * Displays an message if an project has exceeded its end date.
 * @param projectDetails Interface which contains various Project details
 */
function showTimeLeft(projectDetails: projectDetails): void {
    const MySQLDate = projectDetails.eind_datum;
    const end = new Date(MySQLDate);
    const setIntervalFunct = setInterval(function (): void {
        const distance = end.valueOf() - new Date().valueOf();
        const outputProjectTimer = (<HTMLElement>document.getElementById("projectTimer"));
        if (distance < 0) {
            outputProjectTimer.textContent = 'Time is over';
            clearInterval(setIntervalFunct);
        } else {
            showTimerCountdown(distance)
        }
    }, 900);
}

/**
 * Displays an Countdowntimer that shows the user how long the project has before it ends.
 * @param distance an number which contains the time between project end date and current date.
 */
function showTimerCountdown(distance: number): void {
    const seconds = Math.floor((distance / 1000) % 60);
    const minutes = Math.floor((distance / 1000 / 60) % 60);
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const outputProjectTimer = (<HTMLElement>document.getElementById("projectTimer"));
    outputProjectTimer.textContent = `Time left: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

/**
 * Displays the End date of an project to the users timezone
 * @param projectDetails Interface which contains various Project details
 */
function showEndDate(projectDetails: projectDetails): void {
    const JavaScriptDate1 = new Date(projectDetails.eind_datum).toLocaleDateString('en-CO',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit'
        });
    const outputTimeLeft = (<HTMLElement>document.getElementById("timeLeft"));
    outputTimeLeft.textContent = `Project ends on ${JavaScriptDate1}`
}

/**
 * Displays the secondary creator field and shows the Project description.
 * @param projectDetails Interface which contains various Project details
 */
function showOtherValues(projectDetails: projectDetails): void {
    (<HTMLHeadingElement>document.getElementById("projectAuthor2")).textContent = projectDetails.account_id;
    (<HTMLParagraphElement>document.getElementById("campaignDescription")).innerText = projectDetails.campaign_beschrijving;
}

/**
 * This function sends an request to the server, containing an campaign ID taken from the url.
 * @returns a list of details from an requested project
 */
function getProjectDataRequest(): Request {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectNumber: number = Number(urlParams.get('project'));
    const request = new Request("http://localhost:3000/getprojectinfo", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "campaign_id": projectNumber
        })
    })
    console.log(request)
    return request
}
/**
 * This function sends an request to the server, containing an campaign ID taken from the url.
 * @returns an amount of total donators to the specified project
 */
function getDonatorAmount(): Request {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectNumber: number = Number(urlParams.get('project'));
    const request = new Request("http://localhost:3000/getprojectdonators", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "campaign_id": projectNumber
        })
    })
    // console.log(request)
    return request
}

/**
 * This function sends an request to the server, containing an campaign ID taken from the url.
 * @returns an amount of total raised funds to the specified project
 */
function totalAmount(): Request {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectNumber: number = Number(urlParams.get('project'));
    const request = new Request("http://localhost:3000/getTotalAmount", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "campaign_id": projectNumber
        })
    })
    //console.log(request)
    return request
}

