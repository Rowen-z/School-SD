import express from "express";
import * as controllers from "./controllers/controllers";
import { ProjectOverzicht } from "./controllers/projectoverzicht";

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/getprojects/:pagenumber", (req: express.Request, res: express.Response) => {
  const projects: ProjectOverzicht = new ProjectOverzicht(Number(req.params.pagenumber), res);
  projects.getData();
});

app.post("/createaccount", (req: express.Request, res: express.Response) => {
  controllers.addAccount(req, res);
});

app.post("/deleteaccount", (req: express.Request, res: express.Response) => {
  controllers.deleteAccount(req, res);
});

app.post("/getaccountdetails", (req: express.Request, res: express.Response) => {
  controllers.getAccountDetails(req, res);
});

app.put("/changeaccountdetails", (req: express.Request, res: express.Response) => {
  controllers.changeAccountDetails(req, res);
});

/**
 * @param request the request send by the frontend
 * @param response the response the frontend will recieve
 */
app.post("/login", (request: express.Request, response: express.Response) => {
  controllers.login(request, response);
});

app.post("/createcontactform", (request: express.Request, response: express.Response) => {
  controllers.contact(request, response);
});

/**
 * @param request the request send by the frontend
 * @param response the response the frontend will recieve
 */
app.get("/adminuseroverview", (request: express.Request, response: express.Response) => {
  controllers.getUsers(request, response);
});

/**
 * @param request the request send by the frontend
 * @param response the response the frontend will recieve
 */
app.put("/banuser", (request: express.Request, response: express.Response) => {
  controllers.banUser(request, response);
});

app.get("/profilepage/:display_naam", (req: express.Request, res: express.Response) => {
  controllers.profilepage(req, res);
});

app.post("/storedonator", (req: express.Request, res: express.Response) => {
  controllers.addRecentDonator(req, res);
});

app.post("/getrecentdonators", (req: express.Request, res: express.Response) => {
  controllers.getRecentDonators(req, res);
});

app.post("/gettopdonators", (req: express.Request, res: express.Response) => {
  controllers.getTopDonators(req, res);
});

app.post("/getprojectinfo", (req: express.Request, res: express.Response) => {
  controllers.projectinfo(req, res);
});

app.post("/getprojectdonators", (req: express.Request, res: express.Response) => {
  controllers.projectdonators(req, res);
});

app.put('/editaccountdetails', (req: express.Request, res: express.Response) => {
  controllers.updateLevelOfAccess(req, res);
});
app.post("/getTotalAmount", (req: express.Request, res: express.Response) => {
  controllers.projecttotalmoney(req, res);
});

app.post("/storeProject", (req: express.Request, res: express.Response) => {
  controllers.projecttotalmoney(req, res);
});

// app.post("/createproject", (request: express.Request, response: express.Response) => {
//   controllers.createProject(request, response);
// });
// app.post("/getCreatorID", (request: express.Request, response: express.Response) => {
//   controllers.getCreatorIDServer(request, response);
// });

const port = 3000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
