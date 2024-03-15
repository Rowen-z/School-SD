import * as express from 'express';
import { pool } from "../../Utils/database";

export class Donator {
    static addRecentDonator(req: express.Request, res: express.Response) {
        const projectId = req.body.projectID
        const username = req.body.username;
        const amount = req.body.amount;
        const query = `INSERT INTO donators (projectid, username, amount)
        VALUES (
        ${projectId},
        '${username}',
        ${amount})`;
        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            }
            console.log(results)
            res.status(200).json(
                "Donator added"
            );
        })
    }
    static getRecentDonators(req: express.Request, res: express.Response) {
        const projectId = req.body.projectID
        const query = `SELECT username, amount FROM donators
        where projectid = ${projectId}
        ORDER BY donatorid DESC LIMIT 20`;
        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            }
            console.log(results)
            res.status(200).json(
                results
            );
        })
    }
    static getTopDonators(req: express.Request, res: express.Response) {
        const projectId = req.body.projectID
        const query = `SELECT username, amount FROM donators
        where projectid = ${projectId}
        ORDER BY amount DESC LIMIT 10`;
        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            }
            console.log(results)
            res.status(200).json(
                results
            );
        })
    }
}