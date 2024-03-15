import { CreateHTMLelements } from "./createHTMLelements.js";

/**
 * The projects table how it appears in the database
 */
interface ProjectTable {
    campaign_id: string;
    account_id: string;
    campaign_titel: string;
    campaign_beschrijving: string;
    donatie_goal: number;
    opgehaald_bedrag: number;
    eind_datum: string;
    aantal_donaties: number;
    aantal_views: number;
}

/**
 * This extends the projects table with display_naam
 */
interface ProjectDetails extends ProjectTable {
    display_naam: string;
}

/**
 * This is a class that makes the html elements to show on the project page.
 */
class ProjectPage {
    private pageNumber: number;
    private projects: ProjectDetails[];
    private amountOfPages: number;

    constructor(pageNumber: number, projects: ProjectDetails[], amountOfPages: number) {
        this.pageNumber = pageNumber;
        this.projects = projects;
        this.amountOfPages = amountOfPages;
    }

    private makeProjectTile(index: number): void {
        const main: HTMLElement = <HTMLElement>document.getElementById("projects");
        const projectTile: HTMLElement = CreateHTMLelements.createSectionElementWithClass("projectpanel", main);
        this.makePictureSection(index, projectTile);
        this.makeDetailsSection(index, projectTile);
    }

    private makePictureSection(index: number, parentElement: HTMLElement) {
        const pictureSection: HTMLAnchorElement = this.linkToProject(parentElement, `projectinfo.html?project=${this.projects[index].campaign_id}`);
        pictureSection.setAttribute("class", "picturesection");
    }

    private makeDetailsSection(index: number, parentElement: HTMLElement) {
        const detailSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("detailsection", parentElement);
        this.makeTitleSection(index, detailSection);
        this.makeCreatorAndCounterSection(index, detailSection);
        this.makeDescriptionSection(index, detailSection);
        this.makeProgressSection(index, detailSection);
    }

    private makeTitleSection(index: number, parentElement: HTMLElement) {
        const projectTitle: HTMLElement = CreateHTMLelements.createSectionElementWithClass("projecttitle addmargin", parentElement);
        this.linkToProject(projectTitle, `projectinfo.html?project=${this.projects[index].campaign_id}`, this.projects[index].campaign_titel);
    }

    private makeCreatorAndCounterSection(index: number, parentElement: HTMLElement) {
        const creatorAndCounterSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("creatorcountersection addmargin", parentElement);
        this.makeCreatorSection(index, creatorAndCounterSection);
        this.makeCounterSection(index, creatorAndCounterSection);
    }

    private makeCreatorSection(index: number, parentElement: HTMLElement) {
        const creatorSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("creator", parentElement);
        const creatorPictureSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("profilepicture", creatorSection);
        const creatorNameSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("content", creatorSection);
        creatorNameSection.innerText = this.projects[index].display_naam;
    }

    private makeCounterSection(index: number, parentElement: HTMLElement) {
        const counterSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("counter", parentElement);
        const counterAmountSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("content", counterSection);
        const date: Date = new Date(this.projects[index].eind_datum);
        counterAmountSection.innerText = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

    private makeDescriptionSection(index: number, parentElement: HTMLElement): void {
        const descriptionSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("descriptionsection addmargin", parentElement);
        const description: HTMLElement = CreateHTMLelements.createSectionElementWithClass("description addmargin", descriptionSection);
        description.innerText = String(this.projects[index].campaign_beschrijving);
        const readMoreSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("readmore", descriptionSection);
        this.linkToProject(readMoreSection, `projectinfo.html?project=${this.projects[index].campaign_id}`, "read more...");
    }

    private makeProgressSection(index: number, parentElement: HTMLElement): void {
        const progressSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("progresssection addmargin", parentElement);
        this.makeRaisedSection(progressSection, index);
        this.makeProgressBar(progressSection, index);
        this.makeGoalSection(progressSection, index);
    }

    private makeRaisedSection(parentElement: HTMLElement, index: number) {
        const raisedSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("raised", parentElement);
        const raisedContentSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("content", raisedSection);
        raisedContentSection.innerText = `Raised: ${this.projects[index].opgehaald_bedrag}`;
    }

    private makeProgressBar(parentElement: HTMLElement, index: number) {
        const emptyBarSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("emptybar", parentElement);
        const filledBarSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("filledbar", emptyBarSection);
        const filledPercentage: number = this.projects[index].opgehaald_bedrag / this.projects[index].donatie_goal * 100;
        const shownPercentage: number = Math.min(filledPercentage, 100);
        filledBarSection.innerText = `${filledPercentage.toFixed()}%`;
        filledBarSection.style.width = `${shownPercentage}%`;
    }

    private makeGoalSection(parentElement: HTMLElement, index: number) {
        const goalSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("goal", parentElement);
        const goalContentSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("content", goalSection);
        goalContentSection.innerText = `Goal: ${this.projects[index].donatie_goal}`;
    }

    private linkToProject(htmlelement: HTMLElement, link: string, innerText: string = ""): HTMLAnchorElement {
        const anchorElement: HTMLAnchorElement = document.createElement('a');
        anchorElement.href = link;
        anchorElement.innerText = innerText;
        htmlelement.appendChild(anchorElement);
        return anchorElement;
    }

    public makeHTML(): void {
        const shownProjects: number = Math.min(10, this.projects.length);
        for (let index = 0; index < shownProjects; index++) {
            this.makeProjectTile(index);
        }
        this.makeNextAndPreviousPage();
    }

    private makeNextAndPreviousPage(): void {
        if (this.pageNumber >= 1) {
            this.previousPage();
        }
        console.log(this.projects.length);
        if (this.pageNumber < this.amountOfPages) {
            this.nextPage();
        }
    }

    private nextPage(): void {
        const main = <HTMLElement>document.getElementById("projects");
        const nextPageSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("next", main);
        const linkToNextPage: HTMLAnchorElement = document.createElement('a');
        linkToNextPage.href = `projectsoverzicht.html?page=${this.pageNumber + 1}`;
        nextPageSection.appendChild(linkToNextPage);
        linkToNextPage.innerText = 'next page';
    }

    private previousPage(): void {
        const main = <HTMLElement>document.getElementById("projects");
        const nextPageSection: HTMLElement = CreateHTMLelements.createSectionElementWithClass("next", main);
        const linkToPreviousPage = document.createElement('a');
        linkToPreviousPage.href = `projectsoverzicht.html?page=${this.pageNumber - 1}`;
        nextPageSection.appendChild(linkToPreviousPage);
        linkToPreviousPage.innerText = 'previous page';
    }
}

async function getProjects(): Promise<void> {
    const pageNumber: number = getPageNumber();
    const request: Request = makeRequest(pageNumber);
    const projectDetailsResponse: Response = await fetch(request);
    const projectDetails: [ProjectDetails[], number]|string = await projectDetailsResponse.json();
    if (typeof projectDetails !== "string"){
        const projects: ProjectPage = new ProjectPage(pageNumber, projectDetails[0], projectDetails[1]);
        projects.makeHTML();
    } else {
        const main: HTMLElement = <HTMLElement>document.getElementById("projects");
        main.innerText = projectDetails;
    }
}

function makeRequest(pageNumber: number): Request {
    const request = new Request(`http://localhost:3000/getprojects/${pageNumber}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        },
    })
    return request
}

function getPageNumber(): number {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pageNumber: number = Number(urlParams.get('page'));
    return pageNumber
}

getProjects();
