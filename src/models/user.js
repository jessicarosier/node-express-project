
//make sure to require the class in the file you want to use it in
//make sure to create the class so we can use an ORM to interact with the database

class User {
    constructor(dodid, firstName, lastName, email, phone, branch) {
        this.dodid = dodid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.branch = branch;
    }


    getDodid() {
        return this.dodid;
    }

    setDodid(value) {
        this.dodid = value;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(value) {
        this.firstName = value;
    }

    getLastName() {
        return this.lastName;
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

    setLastName(value) {
        this.lastName = value;
    }

    getEmail() {
        return this.email;
    }

    setEmail(value) {
        this.email = value;
    }

    getPhone() {
        return this.phone;
    }

    setPhone(value) {
        this.phone = value;
    }

    getBranch() {
        return this.branch;
    }

    setBranch(value) {
        this.branch = value;
    }

}

module.exports = User;



