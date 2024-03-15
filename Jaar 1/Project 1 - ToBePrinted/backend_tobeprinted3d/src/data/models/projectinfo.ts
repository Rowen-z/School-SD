import * as express from 'express';
import { pool } from "../../Utils/database";

export class Projectinfo {
    static getProject(req: express.Request, res: express.Response) {

        const query = `select  
            accounts.display_naam as account_id,  
            campaign_titel, 
            campaign_afbeelding, 
            campaign_beschrijving, 
            donatie_goal, 
            opgehaald_bedrag, 
            eind_datum, 
            aantal_donaties, 
            aantal_views 
            from projectdatabase.projects 
            INNER JOIN projectdatabase.accounts 
            ON projects.account_id=accounts.id
            where campaign_id = ${req.body.campaign_id}`;
        pool.query(query, (error, results, fields) => {
            if (error != null) {
                console.log(error);
                res.status(404).json(
                    error.message
                );
            } else {
                console.log(results)
                console.log(req.body.campaign_id)
                res.status(200).json(
                    results
                );
            }
        })
    }



    static getDonatorAmount(req: express.Request, res: express.Response) {
        const query = `select count(donatorid) as totalDonators from projectdatabase.donators where projectid = ${req.body.campaign_id}`;
        pool.query(query, (error, results, fields) => {
            if (error != null) {
                res.statusCode = 404;
            } else {
                res.status(200).json(
                    results
                );
            }
        })
    }


static getTotalAmount(req: express.Request, res: express.Response) {
    const query = `select sum(amount) as  totalMoney from projectdatabase.donators where projectid = ${req.body.campaign_id}`;
    pool.query(query, (error, results, fields) => {
        if (error != null) {
            res.statusCode = 404;
        } else {
            res.status(200).json(
                results
            );
        }
    })
}
}
