let express = require("express");
let router = express.Router();

let User = require("../models/user.js");
let userDao = require("../dao/user-dao.js");
const StatsLogic = require("../logic/stats-logic");

/* GET home page. */
router.get("/", async (req, res, next) => {
    let users = await userDao.getAllUsers();
    let title = "Express";
    res.render("index", {title, users});
});

/* GET register page. */
router.get("/register", (req, res, next) => {
    let title = "Register User";
    res.render("register-user", {title});
});

/* POST register page. */
router.post("/register", async (req, res, next) => {
    let user = new User(req.body.dodid, req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.branch);
    let newUser = await userDao.createUser(user);
    let title = "User Registered";
    res.render("user-registered", {title, newUser});
});

router.get("/stats", (req, res, next) => {
    let title = "Stats Page";
    res.render("stats", {title});
});

router.get("/api/v1/stats/:startDate/:endDate", async (req, res, next) => {
    console.log("Getting stats");
    let statsLogic = new StatsLogic();
    await statsLogic.getTotalUsageStats(req, res);

});

module.exports = router;
