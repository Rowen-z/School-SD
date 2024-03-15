import * as mysql2 from "mysql2";

export const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "241865Mb@$!*^%Mb",
  database: "projectdatabase",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
