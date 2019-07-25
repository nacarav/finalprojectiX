var mysqlConn = require("../database/database");

//Task object constructor
var Listing = (listing) => {
    this.listingHostID = listing.listingHostID;
    this.listingClientID = listing.listingClientID;
    this.listingName = listing.listingName;
    this.listingDescription = listing.listingDescription;
    this.listingPrice = listing.listingPrice;
    this.listingStart = listing.listingStart;
    this.listingEnd = listing.listingEnd;
    this.listingImgURL = listing.listingImgURL;
};

// queries all listings! >CHECKED<
Listing.findAllListings = (result) => {
    mysqlConn.query("Select * from listings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

// queries all listings currently assigned to the same inputted hostID. >CHECKED<
Listing.findListingsByHostID = (hostID, result) => {
    mysqlConn.query("Select * from listings where listingHostID= ?", hostID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

// queries all listings currently assigned to the same inputted clientID >CHECKED<
Listing.findListingsByClientID = (clientID, result) => {
    mysqlConn.query("Select * from listings where listingClientID= ?", clientID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

// queries all listings with a clientID of 0, meaning its available for purchase. >CHECKED<
Listing.findAvailableListings = (result) => {
    mysqlConn.query("Select * from listings WHERE listingClientID=0", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

// create a new listing >CHECKED<
Listing.createListing = (newListing, result) => {
    // console.log('new listing' + newListing);
    mysqlConn.query("INSERT INTO listings set ?", newListing, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

// updates a listing based on it's ID, overwriting every other slot with the "newListing"'s saved variables. >CHECKED<
Listing.updateListing = (newListing, result) => {
    mysqlConn.query("UPDATE listings SET listingHostID = ?, listingClientID = ?, listingName = ?, listingDescription = ?, listingPrice = ?, listingStart = ?, listingEnd = ?, listingImgURL = ? WHERE listingID = ?", [newListing.listingHostID, newListing.listingClientID, newListing.listingName, newListing.listingDescription, newListing.listingPrice, newListing.listingStart, newListing.listingEnd, newListing.listingImgURL, newListing.listingID], (err, res) => {
        // is there any way to write the above line in a more clean/ efficient way?
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}; // NICK IS HERE

// delete a listing by it's ID >CHECKED<
Listing.deleteListing = (listingID, result) => {
    mysqlConn.query("DELETE FROM listings where listingID = ?", listingID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};


module.exports = Listing;