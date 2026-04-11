const express = require("express");
const router = express.Router();

//replace /posts with / because server.js file mein it is specified ki /posts use ho rha hai
//INDEX - posts
router.get("/", (req,res)=>{
    res.send("GET for posts");
});

//SHOW - posts
router.get("/:id", (req,res)=>{
    res.send("SHOW for posts id");
});

//POST - users
router.post("/:id", (req,res)=>{
    res.send("POST for posts id");
});

//DELETE - post
router.get("/:id", (req,res)=>{
    res.send("DELETE for post id");
});

module.exports = router;