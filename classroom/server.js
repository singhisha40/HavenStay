const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require('path');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



app.use(session(
    {secret: "mysecretkey",
    resave: false,
    saveUninitialized:true
    }
));
app.use(flash());

app.get("/register", (req,res)=>{
    let {name = "anonymous" } = req.query;
    req.session.name = name;
    req.flash("success", "user registered successfully");
    res.redirect("/hello");
});

app.get("/hello", (req,res)=>{
    res.locals.msg = req.flash("success");
    res.render(`page.ejs`, {name : req.session.name, msg: req.flash('success')});
});


app.get("/reqcount", (req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send(`You sent a request ${req.session.count} times`);
});


app.get("/test", (req, res)=>{
    res.send(`test successful`);
})

// app.use(cookieParser());
// app.get("/", (req,res)=>{
//     console.dir(req.cookies);
// });

// app.get("/greet", (req, res)=>{
//     let{name = "anonymous"} = req.cookies; //will take up entered value if specified
//     res.send(`Hi, ${name}`);
// });

// app.get("/getcookies", (req,res)=>{
//     res.cookie("greeting", "namaste");
//     res.cookie("madeIn", "India");
//     res.cookie("name", "user101'");
//     res.send("we sent 3 cookies");
// });


app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, (req,res)=>{
    console.log('app is listening on port 3000');
})