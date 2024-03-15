import { FieldPacket, RowDataPacket } from "mysql2";
import { pool } from "../../Utils/database"

interface ProjectOverzichtSQL {
    getProjectsCount(): Promise<any>;
    getTenProjects(): Promise<any>
}

export class ProjectOverzichtCRUD implements ProjectOverzichtSQL {
    private pageNumber: number;

    constructor(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    /**
     * @author Casper
     * This method asks the database howmany projects are in it.
     * @returns Promise with the in the result the amount of projects in total.
     */
    public async getProjectsCount(): Promise<RowDataPacket[]> {
        const query: string = `SELECT COUNT(*) AS 'amountOfProjects' FROM projects`
        const [results, _field]: [RowDataPacket[], FieldPacket[]] = await pool.promise().execute<RowDataPacket[]>(query);
        return results;
    }

    /**
     * @author Casper
     * This method returns 10 projects. If pageNumber is 0 it returns project 0 to 10.
     * The variable limit is a string array because it doesn't work as a number array for some reason.
     * @returns Promise with in the result the data of 10 projects.
     */
    public async getTenProjects(): Promise<RowDataPacket[]> {
        const limit: string[] = [`${this.pageNumber * 10}`,`${(this.pageNumber + 1) * 10}`];
        const query: string = `SELECT projects.*, accounts.display_naam FROM projects
        LEFT JOIN accounts
        ON projects.account_id = accounts.id
        ORDER BY projects.campaign_id DESC
        LIMIT ?,?;`
        const [results, _field]: [RowDataPacket[], FieldPacket[]] = await pool.promise().execute<RowDataPacket[]>(query, limit);
        return results;
    }
}