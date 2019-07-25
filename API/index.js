const express = require('express');
const fs = require("fs");
const userRoutes = require("./src/api/user-routes");
const listingRoutes = require("./src/api/listing-routes");

const app = express();
 
const PORT = process.env.PORT || 5000;

var userService = require('./src/models/users');

//Body Parser Middlware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cross-Origin Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  

//App routes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);

// app.get('/users', (req, res) => {
//     userService.getAllUsers((db_err, db_res) => {
//         if (db_err) {
//             console.log("error from db: " + db_err);
//             res.json('error connecting to db');
//         } else {
//             console.log(db_res);
//             res.json(db_res);
//         }
//     });
// });

// app.post('/users', (req, res) => {
//     console.log(req.body);
//     var newUser = {userEmail: req.body.userEmail, userPassword: req.body.userPassword, userFirstName: req.body.userFirstName, userLastName: req.body.userLastName, userRole: userService.body.userRole};
//     userService.createUser(newUser, (db_err, db_res) => {
//         if (db_err) {
//             console.log("error from db: " + db_err);
//             res.json('error connecting to db');
//         } else {
//             console.log(db_res);
//             res.json(db_res);
//         }
//     });
// });

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));