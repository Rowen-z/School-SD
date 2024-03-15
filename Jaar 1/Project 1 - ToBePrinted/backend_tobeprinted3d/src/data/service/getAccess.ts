import { Access } from "../../business/service/access";
import { Account } from "../models/account";

export class GetAccess {
    /**
     * Checks if the user the right access level of an admin
     * @param user an user object
     * @returns true if the user has admin authorization
     */
    public async adminAuthorization(user: Account): Promise<boolean> {
        let isAuthorized = false;
        if (user.id) {
            user.accessLevel = await user.getAccessLevelById(user.id);
            const access = new Access();
            isAuthorized = access.checkAdminAccess(user.accessLevel);
        }
        return isAuthorized;
    }
}
