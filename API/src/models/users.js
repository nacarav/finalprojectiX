var mysqlConn = require("../database/database");

//User object constructor
var User = function (user) {
    this.userEmail = user.userEmail;
    this.userPassword = user.userPassword;
    this.userFirsNname = user.userFirstName;
    this.userLastName = user.userLastName;
    this.userRole = user.userRole;
};

// queries a full list of ALL users. >CHECKED<
User.findAllUsers = (result) => {
    mysqlConn.query("Select * from users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

// queries a full list of users that have inputted role (not sure if there's ever a reason to use this.) >CHECKED<
User.findUserByRole = (userRole, result) => {
    mysqlConn.query("Select * from users where userRole = ?", userRole, (err, res) => {
        console.log("getting here");
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

// creates new user based on newUser object inputs >CHECKED<
User.createUser = (newUser, result) => {
    mysqlConn.query("INSERT INTO users set ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

// queries the single listing that has the unique email input >CHECKED<
User.findUserByEmail = (userEmail, result) => {
    mysqlConn.query("Select * from users where userEmail = ?", userEmail, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};


module.exports = User;