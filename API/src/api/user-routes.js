const express = require('express');
const router = express.Router();

const UserService = require('../services/user-service');
const userServer = new UserService();

// with services we need asynchronous functions due to the nature of JavaScript runtime environment
// Look at JavaScript concurrency model for more information

// address for getting ALL users >CHECKED<
router.get('/', (req, res) => {
    // asynchronous function call structure 
    userServer.findUsers().then(users => {
        res.json(users);
    }).catch(err => {
        res.json(err);
    });
});

// address for getting all users by role >CHECKED<
router.get('/role/:userRole', (req, res) => {
    // asynchronous function call structure 
    userServer.findUserByRole(req.params.userRole).then(user => {
        res.json(user);
    }).catch(err => {                      // NOTE!!! MIGHT HAVE TO CHANGE req.params.### TO CORRESPONDING SERVICE -< DONE
        res.json(err);
    });
});

// address for creating new user >CHECKED< maybe???
router.post('/create', (req, res) => {
    // asynchronous function call structure 
    userServer.createUser(req.body).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
});

// address for getting a user by email ## THIS IS NEW >CHECKED< (i created this, hopefully correct?)
router.get('/:userEmail', (req, res) => {
    // asynchronous function call structure 
    userServer.findUserByEmail(req.params.userEmail).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
});

// address for deleting a user by ID >HOPEFULLY DONT HAVE TO USE THIS.<
router.delete('/delete/:id', (req, res) => {
    // asynchronous function call structure 
    userServer.deleteUser(req.params.id).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;