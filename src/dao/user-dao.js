
const User = require("../models/user.js")


async function getAllUsers() {
    const endpoint = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(endpoint);
    const data = await response.json();
    let users = [];
    data.forEach(user => {
        let { name, username, email, address, phone, website, company } = user;
        users.push(user);
    });
    return users;
}

async function editUser(user) {
    const endpoint = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await response.json();
    return data;
}

module.exports = { getAllUsers };

