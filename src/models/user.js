

class User {
    constructor(name, username, email, address, phone, website, company) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.website = website;
        this.company = company
    }

    getFirstName() {
        return this.name.split(" ")[0];
    }

    getLastName() {
        return this.name.split(" ")[1];
    }

    getCity() {
        return this.address.city;
    }


}

module.exports = User;



