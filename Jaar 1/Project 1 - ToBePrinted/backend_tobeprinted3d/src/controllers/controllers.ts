import * as express from "express";
import { Account } from "../data/models/account";
import { Contact } from "../data/models/contact";
import { Admin } from "../data/models/admin";
import { Donator } from "../data/models/donator";
import { Projectinfo } from "../data/models/projectinfo";
import { GetAccess } from "../data/service/getAccess";

export const addAccount = (req: express.Request, res: express.Response) => {
    Account.addAccount(req, res);
};

export const deleteAccount = (req: express.Request, res: express.Response) => {
    Account.deleteAccount(req, res);
};

export const getAccountDetails = (req: express.Request, res: express.Response) => {
    Account.getAccountDetails(req, res);
};

export const changeAccountDetails = (req: express.Request, res: express.Response) => {
    Account.changeAccountDetails(req, res);
};

export const login = (req: express.Request, res: express.Response) => {
    Account.login(req, res);
};
export const profilepage = (req: express.Request, res: express.Response) => {
    Account.profilepage(req, res);
};

export const getUsers = (req: express.Request, res: express.Response) => {
    const admin = new Admin();
    admin.getUsers(req, res);
};

/**
 * Bans the user given in the request
 * @author Anish Raghoenath <anish.raghoenath@hva.nl>
 * @param req The request rent by the frontend
 * @param res The response that will be send back to the frontend
 */
export const banUser = async (req: express.Request, res: express.Response) => {
    const [admin, access] = [new Admin(), new GetAccess()];
    admin.id = req.body.adminId;
    const isAuthorized = await access.adminAuthorization(admin);
    if (isAuthorized) {
        if (req.body.userId === "") {
            res.status(400).end();
        } else {
            const bannedAccount = new Account();
            bannedAccount.id = req.body.userId;
            if (bannedAccount.id !== undefined) {
                const response = await admin.banUser(bannedAccount.id);
                res.status(response).end();
            }
        }
    } else {
        res.status(403).end();
    }
};

export const addRecentDonator = (
    req: express.Request,
    res: express.Response
) => {
    Donator.addRecentDonator(req, res);
};
export const getRecentDonators = (
    req: express.Request,
    res: express.Response
) => {
    Donator.getRecentDonators(req, res);
};
export const getTopDonators = (req: express.Request, res: express.Response) => {
    Donator.getTopDonators(req, res);
};

export const contact = (req: express.Request, res: express.Response) => {
    Contact.addContact(req, res);
};

export const projectinfo = (req: express.Request, res: express.Response) => {
    Projectinfo.getProject(req, res);
};
export const projectdonators = (
    req: express.Request,
    res: express.Response
) => {
    Projectinfo.getDonatorAmount(req, res);
};

export const projecttotalmoney = (
    req: express.Request,
    res: express.Response
) => {
    Projectinfo.getTotalAmount(req, res);
};
export const updateLevelOfAccess = (req: express.Request, res: express.Response) => {
    Account.updateLevelOfAccess(req, res)
}