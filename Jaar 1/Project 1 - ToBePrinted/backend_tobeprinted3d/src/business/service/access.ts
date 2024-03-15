import { UserRoles } from "../entity/userRoles";

export class Access {
    /**
     * Checks an users access level to the required access level to be a certain role
     * @author Anish Raghoenath <anish.raghoenath@hva.nl>
     * @param userLevel Access level of the user
     * @param requiredLevel The access level required for a role
     * @returns true if it has the exact right level of access
     */
    private checkAccessLevel(
        userLevel: number,
        requiredLevel: number
    ): boolean {
        return userLevel === requiredLevel;
    }

    /**
     * Checks if the given user's access level is right to be that of an admins.
     * @author Anish Raghoenath <anish.raghoenath@hva.nl>
     * @param userLevel Access level of the user
     * @returns true if the user's access level if it is right to be that of an admins
     */
    public checkAdminAccess(userLevel: number): boolean {
        return this.checkAccessLevel(userLevel, UserRoles.ADMIN);
    }
}
