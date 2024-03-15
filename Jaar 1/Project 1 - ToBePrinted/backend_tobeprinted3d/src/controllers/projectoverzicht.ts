import { ProjectOverzichtCRUD } from "../data/models/projectoverzicht";
import express from "express";
import { RowDataPacket } from "mysql2";

export class ProjectOverzicht {
    private pageNumber: number;
    private response: express.Response;
    private projectsOverzichtCRUD: ProjectOverzichtCRUD;
    private amountOfPages: number = 0;

    constructor(pageNumber: number, response: express.Response, projectsOverzichtCRUD: ProjectOverzichtCRUD = new ProjectOverzichtCRUD(pageNumber)) {
        this.pageNumber = pageNumber;
        this.response = response;
        this.projectsOverzichtCRUD = projectsOverzichtCRUD;
    }

    /**
     * @author Casper
     * This method checks if the number is valid and then gets 10 projects if it is.
     * If it isn't valid an error is returned
     */
    public async getData() {
        const numberIsValid = await this.checkValidity();
        numberIsValid ? this.getTenProjects(): this.response.status(404).json("This page does not exist.");
    }

    /**
     * @author Casper
     * This method checks if the given number is valid.
     * A number is valid if it's a non-negative integer that isn't higher than the number of pages.
     * It also calculates and saves the amount of pages.
     * @returns Promise of a boolean
     */
    private async checkValidity(): Promise<boolean> {
        const result: RowDataPacket[] = await this.projectsOverzichtCRUD.getProjectsCount();
        const amountOfProjects: number = result[0].amountOfProjects;
        this.amountOfPages = Math.floor(amountOfProjects / 10);
        return (this.amountOfPages >= this.pageNumber && 
            typeof this.pageNumber == "number" &&
            Math.floor(this.pageNumber) === this.pageNumber &&
            this.pageNumber >= 0);
    }

    /**
     * @author Casper
     * This method asks the calls the crud to give 10 projects.
     * It then returns those projects and the total number of pages.
     */
    private async getTenProjects() {
        const projects: RowDataPacket[] = await this.projectsOverzichtCRUD.getTenProjects();
        const results: [RowDataPacket[], number] = [projects, this.amountOfPages];
        this.response.status(200).json(results);
    }
}