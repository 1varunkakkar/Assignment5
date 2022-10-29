/*************************************************************************
* BTI325– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Varun Kakkar Student ID: 124524216 Date: 7/10/2022
*
* Your app’s URL (from Cyclic) : https://charming-garb-clam.cyclic.app/
*
*************************************************************************/
var express = require("express");
var app = express();
const multer = require("multer");
const fs = require('fs');
var data = require("./data-service.js")
var path = require("path");
var HTTP_PORT = process.env.PORT || 8080
function onHttpStart() {console.log(`Express http server listening on ${HTTP_PORT}`);}
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/views/home.html"))
});
//-------------------------------------------------------------------------------------------------
//Part 2: Adding Routes / Middleware to Support Image Uploads
//Step 1: Adding multer
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
//Define an "upload" variable as multer({ storage: storage });
const upload = multer({ storage: storage });
//-------------------------------------------------------------------------------------------------

//Step 2: Adding the "Post" route
app.post('/images/add', upload.single("imageFile"), (req, res) => {
    res.redirect('/images');
})
// Step 3: Adding "Get" route /images using the "fs" module 
app.get('/images', (req, res) => {
    fs.readdir("./public/images/uploaded", (err, items) => {
        var images = items;
        res.json({ images });
    })
})
//--------------------------------------------------------------------------------------------------
app.post('/employees/add', (req, res) => {
    data.addEmployee(req.body).
        then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    res.redirect('/employees');
})
// Part 3: Adding Routes / Middleware to Support Adding Employees
// Step 1: body-parser
// • In express@4.16.0, the body-parser middleware is included in express, so we don't need to install
// body-parser separately anymore.
// • Inside your server.js file, add the following to handle form data without file upload.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//-------------------------------------------------------------------
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"))
});
//-------------------------------------------------------------------
app.get("/employees", (req, res) => {

    if (req.query.status) {

        data.getEmployeesByStatus(req.query.status).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    }

    if (req.query.department) {

        data.getEmployeesByDepartment(req.query.department).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    }

    if (req.query.manager) {

        data.getEmployeesByManager(req.query.manager).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    }

    else
    {
        data.getAllEmployees().
            then((data) => { res.json(data); }).
            catch((err) => {
                console.log(err)
            });
    }
});

app.get('/employee/:value', (req, res) => {

    data.getEmployeeByNum(req.params.value).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })

})
//--------------------------------------------------------------------
app.get("/managers", function (req, res) {
    data.getManagers().then((data) => { res.json(data); }).catch((err) => {console.log(err)});
});
//---------------------------------------------------------------------
app.get("/departments", function (req, res) {
    data.getDepartments().then((data) => { res.json(data); }).catch((ex) => {console.log(ex)})
});
//----------------------------------------------------------------------
//GET /employees/add
app.get("/employees/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
})
//GET /images/add
app.get("/images/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
})









//----------------------------------------------------------------------
app.use(function (req, res) {
    res.status(404).send("Page not found");
});
//----------------------------------------------------------------------
data.initialize().then(() => { app.listen(HTTP_PORT, onHttpStart()) }).catch(() => {
    console.log("Server not responding!");
});
//-----------------------------------------------------------------------
