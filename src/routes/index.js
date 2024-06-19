let express = require('express');
let router = express.Router();

let User = require("../models/user.js")
let userDao = require("../dao/user-dao.js")

/* GET home page. */
router.get('/', async (req, res, next) => {

    let users = await userDao.getAllUsers();
  res.render('index', {title: 'Express', users: users});
});

module.exports = router;
