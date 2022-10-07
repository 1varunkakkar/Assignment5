/*************************************************************************
* BTI325– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Varun Kakkar Student ID: 124524216 Date: 7/10/2022
*
* Your app’s URL (from Cyclic) : ______________________________________________
*
*************************************************************************/
var fs = require('fs');
var emp = [];
var dpt = [];
var mngrs = [];
//---------------------------------------------------------------------------------------
module.exports.initialize = function(){
    return new Promise(function(resolve, reject) {
        fs.readFile('./data/employees.json', (err, data) => {
            if (err) {reject("Failure to read file employees.json!");}
            else {emp = JSON.parse(data);
                resolve(emp);
            }
        })
        fs.readFile('./data/departments.json', (err, data) => {
            if (err) {reject("Failure to read file departments.json!");}
            else {dpt = JSON.parse(data);
                resolve(dpt);
            }
        })

    })
}
//----------------------------------------------------------------------------------------
module.exports.getAllEmployees = function(){
    return new Promise(function (resolve, reject) {
        if (emp.length > 0) {resolve(emp);}
        else {reject("no results returned");};
    })
}
//-----------------------------------------------------------------------------------------
module.exports.getManagers = function() {
    return new Promise(function (resolve, reject) {
        if (emp.length > 0) {
            var let = 0;
            for (var i in emp) {
                if (emp[i].isManager == true) {
                    mngrs[let] = emp[i];
                    let++;
                }
            }
            resolve(mngrs);
        }
        else {reject("no results returned");};
    }
    )
}
//-------------------------------------------------------------------------------------------
module.exports.getDepartments = function(){
    return new Promise(function (resolve, reject) {
        if (dpt.length > 0) {resolve(dpt);}
        else {reject("no results returned");};
    }
    )
}
//-------------------------------------------------------------------------------------------