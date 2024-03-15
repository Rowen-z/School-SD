import * as express from 'express';
import { RowDataPacket } from 'mysql2';
import { pool } from "../../Utils/database";

export class Account {
    private _id?: number | undefined;
    private _loginName?: string | undefined;
    private _displayName?: string | undefined;
    private _email?: string | undefined;
    private _firstName?: string | undefined;
    private _prefix?: string | undefined;
    private _lastName?: string | undefined;
    private _city?: string | undefined;
    private _streetName?: string | undefined;
    private _houseNumber?: number | undefined;
    private _zipCode?: string | undefined;
    private _phoneNumber?: string | undefined;
    private _birthDate?: Date | undefined;
    private _bankAccount?: string | undefined;
    private _description?: string | undefined;
    private _accessLevel?: number | undefined;

    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }

    public get loginName(): string | undefined {
        return this._loginName;
    }
    public set loginName(value: string | undefined) {
        this._loginName = value;
    }

    public get displayName(): string | undefined {
        return this._displayName;
    }
    public set displayName(value: string | undefined) {
        this._displayName = value;
    }

    public get email(): string | undefined {
        return this._email;
    }
    public set email(value: string | undefined) {
        this._email = value;
    }

    public get firstName(): string | undefined {
        return this._firstName;
    }
    public set firstName(value: string | undefined) {
        this._firstName = value;
    }

    public get prefix(): string | undefined {
        return this._prefix;
    }
    public set prefix(value: string | undefined) {
        this._prefix = value;
    }

    public get lastName(): string | undefined {
        return this._lastName;
    }
    public set lastName(value: string | undefined) {
        this._lastName = value;
    }

    public get city(): string | undefined {
        return this._city;
    }
    public set city(value: string | undefined) {
        this._city = value;
    }

    public get streetName(): string | undefined {
        return this._streetName;
    }
    public set streetName(value: string | undefined) {
        this._streetName = value;
    }

    public get houseNumber(): number | undefined {
        return this._houseNumber;
    }
    public set houseNumber(value: number | undefined) {
        this._houseNumber = value;
    }

    public get zipCode(): string | undefined {
        return this._zipCode;
    }
    public set zipCode(value: string | undefined) {
        this._zipCode = value;
    }

    public get phoneNumber(): string | undefined {
        return this._phoneNumber;
    }
    public set phoneNumber(value: string | undefined) {
        this._phoneNumber = value;
    }

    public get birthDate(): Date | undefined {
        return this._birthDate;
    }
    public set birthDate(value: Date | undefined) {
        this._birthDate = value;
    }

    public get bankAccount(): string | undefined {
        return this._bankAccount;
    }
    public set bankAccount(value: string | undefined) {
        this._bankAccount = value;
    }

    public get description(): string | undefined {
        return this._description;
    }
    public set description(value: string | undefined) {
        this._description = value;
    }

    public get accessLevel(): number | undefined {
        return this._accessLevel;
    }
    public set accessLevel(value: number | undefined) {
        this._accessLevel = value;
    }

    // constructor(
    //     id: number,
    //     displayName: string,
    //     email: string,
    //     firstName: string,
    //     prefix: string,
    //     lastName: string,
    //     city: string,
    //     streetName: string,
    //     houseNumber: number,
    //     zipCode: string,
    //     phoneNumber: string,
    //     birthDate: Date,
    //     bankAccount: string,
    //     description: string
    // ) {
    //     this.id = id;
    //     this.displayName = displayName;
    //     this.email = email;
    //     this.firstName = firstName;
    //     this.prefix = prefix;
    //     this.lastName = lastName;
    //     this.city = city;
    //     this.streetName = streetName;
    //     this.houseNumber = houseNumber;
    //     this.zipCode = zipCode;
    //     this.phoneNumber = phoneNumber;
    //     this.birthDate = birthDate;
    //     this.bankAccount = bankAccount;
    //     this.description = description;
    // }

    static login(req: express.Request, res: express.Response) {
        console.log(req);
        let query = `SELECT * FROM accounts WHERE display_naam = '${req.body.username}' AND accountpassword = '${req.body.password}';`;
        pool.query(query, (error, results, fields) => {
            if (error != null) {
                console.log(error);
                res.status(404).json(error.message);
            } else {
                res.status(200).json(results);
            }
        });
    }

    static addAccount(req: express.Request, res: express.Response) {
        pool.query(
            'INSERT INTO accounts SET ?', req.body, function (err, results, fields) {
                if (err != null) {
                    console.log(err);
                    res.status(404).json(err.message);
                } else {
                    res.status(200).json("account added");
                }
            }
        );
    }

    static deleteAccount(req: express.Request, res: express.Response) {
        const username = req.body.username;
        const password = req.body.accountpassword;
        const query = `DELETE FROM accounts WHERE display_naam = '${username}' AND accountpassword = '${password}'`;
        pool.query(query, (err, results, fields) => {
            if (err != null) {
                console.log(err);
                res.status(404).json(err.message);
            } else {
                console.log(results);
                res.status(200).json("account deleted");
            }
        });
    }

    /**
     * This function selects the account details of the user and sends it back to the frontend.
     * @author Rowen Zaal
     * 
     */
    static getAccountDetails(req: express.Request, res: express.Response) {
        const userId = req.body.userId;
        const query = `SELECT display_naam, email, voornaam, tussenvoegsels, achternaam, woonplaats, straatnaam, huisnummer, postcode, telefoonnummer, geboortedatum, bankrekening, beschrijving FROM accounts 
        WHERE id = '${userId}'`;
        pool.query(query, (err, results, fields) => {
            if (err != null) {
                console.log(err);
                res.status(404).json(err.message);
            } else {
                console.log(results);
                res.status(200).json(results);
            }
        });
    }

    static changeAccountDetails(req: express.Request, res: express.Response) {
        const userDetails = [
            req.body.userId,
            req.body.userName,
            req.body.email,
            req.body.firstName,
            req.body.prefix,
            req.body.lastName,
            req.body.city,
            req.body.streetName,
            req.body.houseNumber,
            req.body.zipCode,
            req.body.phoneNumber,
            req.body.birthDate,
            req.body.bankAccount,
            req.body.description
        ] as string[];
        const query = `
        UPDATE accounts
        SET 
        display_naam = '${userDetails[1]}', 
        email = '${userDetails[2]}', 
        voornaam = '${userDetails[3]}', 
        tussenvoegsels = '${userDetails[4]}', 
        achternaam = '${userDetails[5]}', 
        woonplaats = '${userDetails[6]}', 
        straatnaam = '${userDetails[7]}', 
        huisnummer = '${userDetails[8]}', 
        postcode = '${userDetails[9]}', 
        telefoonnummer = '${userDetails[10]}', 
        geboortedatum = '${userDetails[11]}', 
        bankrekening = '${userDetails[12]}', 
        beschrijving = '${userDetails[13]}'
        WHERE id = ${userDetails[0]}`;
        pool.query(query, (err, results, fields) => {
            if (err != null) {
                console.log(err);
                res.status(404).json("Failed to update account details");
            } else {
                console.log(results);
                res.status(200).json("Account details updated");
            }
        });
    }
    
    static profilepage(req: express.Request, res: express.Response) {
        console.log("fetching display_naam: " + req.params.display_naam);
        const accountusername = req.params.display_naam;
        const queryString = "SELECT * FROM accounts WHERE display_naam = ?";
        pool.query(queryString, [accountusername], (err, results, fields) => {
            if (err) {
                console.log("failed to query for accounts: " + err);
                res.sendStatus(500);
                return;
            }
            console.log("fetched the table accounts succesfully");
            res.json(results);
        });
    }

    /**
     * Gets an users access level by their id.
     * @author Anish Raghoenath <anish.raghoenath@hva.nl>
     * @param userId the id of the user which you want the access level from
     * @returns the user's access level
     */
    public async getAccessLevelById(userId: number): Promise<number> {
        const query =
            "SELECT toegangs_level as accessLevel FROM accounts WHERE id = ?";
        const [results, fields] = await pool
            .promise()
            .execute<RowDataPacket[]>(query, [userId]);
        const accessLevel: number = results[0].accessLevel;
        return accessLevel;
    }

    static updateLevelOfAccess(req: express.Request, res: express.Response) {
        const username = req.body.Username;
        // First check if the fields are not null
        const checkQuery = `SELECT count(*) as count from accounts WHERE display_naam = '${username}' AND voornaam IS NOT NULL AND achternaam IS NOT NULL AND bankrekening IS NOT NULL`;
        pool.query(checkQuery, (err, results: RowDataPacket[]) => {
            if (err) {
                console.log("check query failed: " + err);
                res.sendStatus(500);
                return;
            }
            // If the fields are not null, then update the level of access
            if (results.length > 0 && results[0].count > 0) {
                const updateQuery = `UPDATE accounts SET toegangs_level = 2 WHERE display_naam = '${username}'`;
                pool.query(updateQuery, (err, results) => {
                    if (err) {
                        console.log("update query failed: " + err);
                        res.sendStatus(500);
                        return;
                    }
                    res.json(results);
                });
            } else {
                res.json({ message: "fields are null" });
            }
        });
    }
}