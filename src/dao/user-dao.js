const User = require("../models/user.js");
const redisClient = require("../config/Redis_Functions");
const {json} = require("express");


async function getAllUsers() {
    const endpoint = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(endpoint);
    const data = await response.json();
    let users = [];
    data.forEach((user) => {
        let {name, username, email, address, phone, website, company} = user;
        users.push(user);
    });
    return users;
}


function createUser(user) {
    //save user to redis db
    redisClient.connect().then(() => {
        redisClient.setHashKey("user" + ":" + user.getDodid(), "data", user), (err, reply) => {
            if (err) {
                console.log(err);
            }
            console.log(reply);
        };
    });
    return user;
}

module.exports = {getAllUsers, createUser};
