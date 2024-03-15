/**
 * @author Anish Raghoenath <anish.raghoenath@hva.nl>
 */

import { CreateHTMLelements } from "./createHTMLelements.js";

/**
 * All of the possible keynames in an user object
 */
type userObject = {
    [key: string]: any;
    profielfoto: string;
    id: number;
    display_naam: string;
    login_naam: string;
    email: string;
    voornaam?: string;
    tussenvoegsels?: string;
    achternaam?: string;
    postcode?: string;
    telefoonnummer?: number;
    gemaakt_op: Date;
    toegangs_level: number;
    huisnummer?: number;
};

/**
 * Loads all the users.
 */
async function initAdminUsersOverview(): Promise<void> {
    const users: userObject[] = await getAllUsers();
    displayUsers(users);
}
initAdminUsersOverview();

/**
 * Gets a list of all the users
 * @returns a list of the users
 */
async function getAllUsers(): Promise<userObject[]> {
    const response = await fetch("http://localhost:3000/adminuseroverview");
    const users: userObject[] = await response.json();
    return users;
}

/**
 * Places the users in the DOM
 * @param users a list of all the users
 */
function displayUsers(users: userObject[]): void {
    for (let i = 0; i < users.length; i++) {
        const formattedUserInfo = formatUserInfo(users[i]);
        const tablerow: HTMLTableRowElement = document.createElement("tr");
        const tableDataImage: HTMLTableCellElement =
            document.createElement("td");

        CreateHTMLelements.createImageElement(
            `${users[i].profielfoto}`,
            tableDataImage
        );

        tablerow.appendChild(tableDataImage);

        for (let j = 0; j < formattedUserInfo.length; j++) {
            const tableData = document.createElement("td");
            tableData.insertAdjacentText("beforeend", formattedUserInfo[j]);
            if (users[i]["toegangs_level"] === Number(formattedUserInfo[j])) {
                tableData.setAttribute("id", `toegangsLevelRij${i + 1}`);
            }
            tablerow.appendChild(tableData);
        }

        CreateHTMLelements.createButtonElement(
            `banUser${i + 1}Button`,
            tablerow,
            "Ban user"
        ).addEventListener("click", banUser);

        document.getElementById("tableBody")?.appendChild(tablerow);
    }
}

/**
 * Formats the information of a user
 * @param user an user from the database
 * @returns a list of this users information formatted.
 */
function formatUserInfo(user: userObject): string[] {
    const currentKeynamesList: string[] = [
        "id",
        "display_naam",
        "login_naam",
        "voornaam",
        "postcode",
        "telefoonnummer",
        "gemaakt_op",
        "toegangs_level",
        "huisnummer",
        "tussenvoegsels",
        "achternaam",
    ];
    const formattedKeynamesList: string[] = [
        "id",
        "display_naam",
        "login_naam",
        "naam",
        "postcode",
        "telefoonnummer",
        "gemaakt_op",
        "toegangs_level",
    ];

    defineEmptyData(user, currentKeynamesList);

    const formattedUserInfo = createFormattedUserInfo(
        user,
        currentKeynamesList,
        formattedKeynamesList
    );

    return formattedUserInfo;
}

/**
 *
 * @param user a user saved in the database
 * @param currentKeynamesList a list of all of the keynames
 */
function defineEmptyData(user: userObject, currentKeynamesList: string[]) {
    for (let i = 0; i < currentKeynamesList.length; i++) {
        if (
            user[currentKeynamesList[i]] == null ||
            user[currentKeynamesList[i]] == undefined
        ) {
            user[currentKeynamesList[i]] = "";
        }
    }
}

/**
 *
 * @param user a user saved in the database
 * @param currentKeynamesList a list of all the keynames
 * @param formattedKeynamesList a list of all the
 * @returns a list of the user's info correclty formatted
 */
function createFormattedUserInfo(
    user: userObject,
    currentKeynamesList: string[],
    formattedKeynamesList: string[]
): string[] {
    let formattedUserInfo: string[] = [];

    for (let i = 0; i < formattedKeynamesList.length; i++) {
        switch (
            currentKeynamesList[i] //? fkl is maybe better ???
        ) {
            case "postcode":
                formattedUserInfo.push(
                    concatUserInfo(user, ["postcode", "huisnummer"])
                );
                break;
            case "voornaam":
                formattedUserInfo.push(
                    concatUserInfo(user, [
                        "voornaam",
                        "tussenvoegsels",
                        "achternaam",
                    ])
                );
                break;
            default:
                formattedUserInfo.push(user[formattedKeynamesList[i]]);
        }
    }

    return formattedUserInfo;
}

/**
 * Concacts the values of the given keys.
 * @param user a user from the database
 * @param keys a list of keys that has to be concatenated
 * @returns the formatted string
 */
function concatUserInfo(user: userObject, keys: string[]) {
    let formattedString = "";

    for (let i = 0; i < keys.length; i++) {
        formattedString += user[keys[i]] + " ";
    }

    return formattedString;
}

async function banUser(event: Event): Promise<void> {
    const confirmAlert = confirm("Are you sure you want ban this user?");

    if (confirmAlert === false) {
        return;
    }
    const responseStatus = await banUserRequest(3, 1);
    console.log(responseStatus);
    const targetElement = event.target as HTMLButtonElement;
    const elementIdAsArray = targetElement.id.split("");
    const rowNumber = elementIdAsArray[7];

    const accessLevelCell = document.getElementById(
        `toegangsLevelRij${rowNumber}`
    ) as HTMLTableCellElement;

    accessLevelCell.textContent = "-1";
    accessLevelCell.parentElement?.classList.add("bannedUser");
}

async function banUserRequest(
    userId: number,
    adminId: number
): Promise<number> {
    const response = await fetch("http://127.0.0.1:3000/banuser", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            adminId: adminId,
        }),
    });
    return response.status;
}
