const express = require('express');
const router = express.Router();

const ListingService = require('../services/listing-service');
const listingServer = new ListingService();

// with services we need asynchronous functions due to the nature of JavaScript runtime environment
// Look at JavaScript concurrency model for more information

// get all >CHECKED<
router.get('/', (req, res) => {
    // asynchronous function call structure 
    listingServer.findListings().then(listing => {
        res.json(listing);
    }).catch(err => {
        res.json(err);
    });
});

// listing retrieval by host ID route >CHECKED<
router.get('/host/:hostID', (req, res) => {
    // asynchronous function call structure 
    listingServer.findListingsByHostID(req.params.hostID).then(listing => {
        res.json(listing);
    }).catch(err => {
        res.json(err);
    });
});

// listing retrieval by client ID route >CHECKED<
router.get('/client/:clientID', (req, res) => {
    // asynchronous function call structure 
    listingServer.findListingsByClientID(req.params.clientID).then(listing => {
        res.json(listing);
    }).catch(err => {
        res.json(err);
    });
});

// listing retrieval of all un-owned houses >CHECKED<
router.get('/available', (req, res) => {
    // asynchronous function call structure 
    listingServer.findAvailable().then(listing => {
        res.json(listing);
    }).catch(err => {
        res.json(err);
    });
});

// creation address route >CHECKED<
router.post('/create/', (req, res) => {
    // asynchronous function call structure 
    console.log(req.body);
    listingServer.createListing(req.body).then(listing => {
        res.json(listing);
    }).catch(err => {
        res.json(err);
    });
});

// updates existing listing >CHECKED<
router.post('/update', (req, res) => {
    // asynchronous function call structure 
    listingServer.updateListing(req.body).then(listing => {
        res.json(listing);
    }).catch(err => {
        res.json(err);
    });
});

// deletes a listing through its listingID >CHECKED<
router.delete('/delete/:id', (req, res) => {
    // asynchronous function call structure 
    listingServer.deleteListing(req.params.id).then(listing => {
        res.json(listing);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;