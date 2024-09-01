let express = require("express");
let indexRouter = express.Router();

let User = require("../models/user.js");
let userDao = require("../dao/user-dao.js");
const StatsLogic = require("../logic/stats-logic");

/* GET home page. */
indexRouter.get("/", async (req, res, next) => {
    let users = await userDao.getAllUsers();
    let title = "Express";
    res.render("index", {title, users});
});

/* GET register page. */
indexRouter.get("/register", (req, res, next) => {
    let title = "Register User";
    res.render("register-user", {title});
});

/* POST register page. */
indexRouter.post("/register", async (req, res, next) => {
    let user = new User(req.body.dodid, req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.branch);
    let newUser = await userDao.createUser(user);
    let title = "User Registered";
    res.render("user-registered", {title, newUser});
});

indexRouter.get("/pdf", (req, res, next) => {
    let title = "Generate PDF";
    res.render("run-scripts", {title});
});

indexRouter.get("/api/v1/stats/:startDate/:endDate", async (req, res, next) => {
    console.log("Getting stats");
    let statsLogic = new StatsLogic();
    await statsLogic.getTotalUsageStats(req, res);

});

module.exports = indexRouter;
