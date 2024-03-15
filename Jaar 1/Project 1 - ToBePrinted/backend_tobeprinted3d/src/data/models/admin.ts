import * as express from "express";
import { ResultSetHeader } from "mysql2/typings/mysql/lib/protocol/packets";
import { pool } from "../../Utils/database";
import { Account } from "./account";

export class Admin extends Account {
    /**
     * Gets a list of all the users
     * @author Anish Raghoenath <anish.raghoenath@hva.nl>
     * @param req request from the frontend
     * @param res response to the frontend
     */
    public getUsers(req: express.Request, res: express.Response) {
        const query = `SELECT id, login_naam, display_naam, toegangs_level, gemaakt_op, voornaam, achternaam, postcode, huisnummer, telefoonnummer, profielfoto FROM accounts`;
        pool.query(query, (error, results, fields) => {
            if (error !== null) {
                res.statusCode = 404;
            } else {
                res.status(200).json(results);
            }
        });
    }

    /**
     * Bans the given user
     * @author Anish Raghoenath <anish.raghoenath@hva.nl>
     * @param userId the id of an user
     */
    public async banUser(userId: number): Promise<number> {
        const query =
            "UPDATE projectdatabase.accounts SET toegangs_level = -1 WHERE id = ?";
        let response: number = 400;

        const [results] = await pool
            .promise()
            .execute<ResultSetHeader>(query, [userId]);

        if (results.changedRows === 0) {
            response = 400;
        } else if (results.changedRows === 1) {
            response = 200;
        }

        return response;
    }
}
