const express = require("express");
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require("../controllers/listing.js")
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//index route,create route : show all listings, create new listing
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        wrapAsync(listingController.createListing)
    )
    

//create route
router.get("/new", isLoggedIn, listingController.renderNewForm);
        
router.route("/:id")
        .get(
            wrapAsync(listingController.showListings))
        .put(
            isLoggedIn, 
            isOwner, 
            upload.single("listing[image]"),
            validateListing, 
            wrapAsync(listingController.updateListing))
        .delete(
            isLoggedIn,
            wrapAsync(listingController.destroyListing))

//UPDATE route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;