const fs = require("fs");
const Listing = require("../models/listings");

module.exports = class ListingService {

    constructor() { }

    // queries all listings. >CHECKED<
    findListings() {
        return new Promise((resolve, reject) => {
            Listing.findAllListings((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    // queries all listings that match host ID. >CHECKED<
    findListingsByHostID(hostID) {
        return new Promise((resolve, reject) => {
            Listing.findListingsByHostID(hostID, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    // queries all listings that match client ID >CHECKED<
    findListingsByClientID(clientID) {
        return new Promise((resolve, reject) => {
            Listing.findListingsByClientID(clientID, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    // queries all listings that have no client >CHECKED<
    findAvailable() {
        return new Promise((resolve, reject) => {
            Listing.findAvailableListings((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    // Posts a new listing to the database. >CHECKED<
    createListing(listingReq) {
        return new Promise((resolve, reject) => {
            Listing.createListing(listingReq, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    // Updates an already existing Listing. >CHECKED<
    updateListing(listingReq) {
        return new Promise((resolve, reject) => {
            Listing.updateListing(listingReq, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    // Deletes an already existing listing. >CHECKED<
    deleteListing(listingReq) {
        return new Promise((resolve, reject) => {
            Listing.deleteListing(listingReq, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
}