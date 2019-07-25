const fs = require("fs");
const User = require("../models/users");

module.exports = class UserService {

    constructor() { }

    // Service for querying ALL users. >CHECKED<
    findUsers() {
        return new Promise((resolve, reject) => {
            User.findAllUsers((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    // Service for querying by role. >CHECKED<
    findUserByRole(userRole) {
        // return promise (asynchronous function method)
        // https://developers.google.com/web/fundamentals/primers/promises
        return new Promise((resolve, reject) => {
            User.findUserByRole(userRole, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    // Service for creating a new user. >CHECKED< but 'userReq' is confusing.
    createUser(userReq) {
        // return promise (asynchronous function method)
        // https://developers.google.com/web/fundamentals/primers/promises
        return new Promise((resolve, reject) => {
            User.findUserByEmail(userReq.userEmail, (err, res) => { // check if user exists
                if (err) {
                    reject(err);
                }
                console.log(res);
                if (res.length < 1) { // create user
                    User.createUser(userReq, (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(res);
                    });
                }
                else {
                    reject("user already exists");
                }
            })
        });
    }

    // Service for finding a user by Email. >CHECKED<
    findUserByEmail(userEmail) {
        return new Promise((resolve, reject) => {
            User.findUserByEmail(userEmail, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    // Service for deleting a user by ID. >NO CLUE IF THIS WORKS, AFRAID TO TOUCH<
    deleteUser(userId) {
        // return promise (asynchronous function method)
        // https://developers.google.com/web/fundamentals/primers/promises
        return new Promise((resolve, reject) => {
            fs.readFile("./src/data/data.json", (err, data) => {
                if (err) { reject(err); } // reject error in promise
                else if (data) {
                    let users = JSON.parse(data);
                    const found = users.users.some(user => user.id === userId);
                    if (found) {
                        users.users = users.users.filter(user => user.id != userId);

                        fs.writeFile("./src/data/data.json", JSON.stringify(users), (err) => {
                            if (err) {
                                reject(err); // reject error in promise
                            }
                        });

                        resolve("user was deleted"); // resolve promise to return value
                    }
                    else {
                        resolve("user doesn't exist"); // resolve promise to return value
                    }
                }
            });
        });
    }



}