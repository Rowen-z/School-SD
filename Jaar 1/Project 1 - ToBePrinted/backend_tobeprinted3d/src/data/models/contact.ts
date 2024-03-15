import * as express from 'express';
import { pool } from "../../Utils/database";

export class Contact {
    // constructor(private name: string, private subject: string, email: string, private message: string) {
    // }

    static addContact(req: express.Request, res: express.Response) {
        const name = req.body.name;
        const email = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;
        pool.query(
            `INSERT INTO contactform (name,email,subject,message) VALUES ('${name}','${email}','${subject}','${message}')`,
            function (err) {
                if (err != null) {
                    console.log(err);
                    res.status(404).json(
                        err.message
                    );
                } else {
                    res.status(200).json(
                        "Succes"
                    );
                }
            }
        )
    }
}

// INSERT INTO contactform (name,email,subject,message) VALUES ("Sven","Sven@test.com","Other","Everything")
