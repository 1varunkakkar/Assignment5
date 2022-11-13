/*************************************************************************
* BTI325– Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this assignment has been copied manually or electronically from any other source.
* (including 3rd party web sites) or distributed to other students.
*
* Name: VARUN KAKKAR Student ID: 124524216 Date: 29/10/2022
*
* Your app’s URL (from Cyclic Heroku) that I can click to see your application:
* https://serene-fortress-45199.herokuapp.com/
*
*************************************************************************/
var express = require("express");
var app = express();
const multer = require("multer");
const fs = require('fs');
var data = require("./data-service.js")
var path = require("path");
const { engine } = require("express-handlebars");
var HTTP_PORT = process.env.PORT || 8080
function onHttpStart() { console.log(`Express http server listening on ${HTTP_PORT}`); }
//------------------------------------------------------------------------------------------------
app.use(express.static('./public/'));
//------------------------------------------------------------------------------------------------
app.engine(".hbs", engine({
    extname: ".hbs",
    helpers: {
        navLink: function (url, options) {
            return '<li' +
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
                '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {return options.inverse(this);}
            else {return options.fn(this);}
        }

    }
}));
app.set("view engine", ".hbs");
//-------------------------------------------------------------------------------------------------
//Part 2: Adding Routes / Middleware to Support Image Uploads
//Step 1: Adding multer
const storage = multer.diskStorage({destination: "./public/images/uploaded",filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }});
//Define an "upload" variable as multer({ storage: storage });
const upload = multer({ storage: storage });
//-------------------------------------------------------------------------------------------------
//Step 2: Adding the "Post" route
// app.post('/images/add', upload.single("imageFile"), (req, res) => {
//     res.redirect('/images');
// })
// app.post('/employees/add', (req, res) => {data.addEmployee(req.body).then(data => {res.json(data);}).catch(err => {console.log(err);})
//     res.redirect('/employees');
// })
//--------------------------------------------------------------------------------------------------
// Step 3: Adding "Get" route /images using the "fs" module 
// app.get('/images', (req, res) => {
//     fs.readdir("./public/images/uploaded", (err, items) => {
//         var images = items;
//         res.json({ images });
//     })
// })
//---------------------------------------------------------------------------------------------------
// Part 3: Adding Routes / Middleware to Support Adding Employees
// Step 1: body-parser
// • In express@4.16.0, the body-parser middleware is included in express, so we don't need to install
// body-parser separately anymore.
// • Inside your server.js file, add the following to handle form data without file upload.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//-------------------------------------------------------------------
app.use(function (req, res, next) {
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});
//-------------------------------------------------------------------
app.post('/images/add', upload.single("imageFile"), (req, res) => {
    res.render("addImage", { layout: "main" });
})
//-------------------------------------------------------------------
app.post('/employees/add', (req, res) => {
    res.render("addEmployee", { layout: "main" })
});
//-------------------------------------------------------------------
app.get('/', function (req, res) {
    res.render("home", { layout: "main" })
});
//-------------------------------------------------------------------
app.get("/about", (req, res) => {
    res.render("about", { layout: "main" })
});
// app.get("/images", (req, res) => {
//     res.render("images", { layout: "main" })
// });
//-------------------------------------------------------------------
app.get("/employees", (req, res) => {

    if (req.query.status) {data.getEmployeesByStatus(req.query.status).then(data => {res.render("employees", { employee: data })}).catch(err => {res.render({ message: "no results" });})}

    if (req.query.department) {data.getEmployeesByDepartment(req.query.department).then(data => {res.render("employees",{ employee: data })}).catch(err => {res.render({ message: "no results" });})}

    if (req.query.manager) {data.getEmployeesByManager(req.query.manager).then(data => {res.render("employees",{ employee: data })}).catch(err => {res.render({ message: "no results" });})}

    data.getAllEmployees().then((data) => {res.render("employees", { employee: data, layout: "main" })}).catch(err => {res.render({ message: "no results" });});});
//-----------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/employee/:value', (req, res) => {data.getEmployeeByNum(req.params.value).then(data => {res.render("employee", { employee: data });}).catch(err => {res.render("employee", { message: "no results" });})})
app.post("/employee/update", (req, res) => {data.updateEmployee(req.body).then(data => { res.redirect("/employees/"); })});
//--------------------------------------------------------------------
// app.get("/managers", function (req, res) {
//     data.getManagers().then((data) => { res.json(data); }).catch((err) => {console.log(err)});
// });
//---------------------------------------------------------------------
app.get("/departments", function (req, res) {data.getDepartments().then((data) => {res.render("departments", {departments: data});}).catch((ex) => {res.render({ message: "no results" });})})
//----------------------------------------------------------------------
//PART-1
//GET /employees/add
app.get("/employees/add", (req, res) => {res.render("addEmployee");})
//--------------------------------------------------------------------
//GET /images/add
app.get("/images/add", (req, res) => {res.render("addImage");})
//---------------------------------------------------------------------
app.get("/images", (req, res) => {fs.readdir("./public/images/uploaded", (err, items) => {res.render("images", { data: items });})})
//----------------------------------------------------------------------
app.use(function (req, res) { res.status(404).send("Page not found"); });
//----------------------------------------------------------------------
data.initialize().then(() => { app.listen(HTTP_PORT, onHttpStart()) }).catch(() => { console.log("Server not responding!"); });
//-----------------------------------------------------------------------
