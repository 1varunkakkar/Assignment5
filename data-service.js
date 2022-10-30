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
var fs = require('fs');
var emp = [];
var dpt = [];
var mngrs = [];
var employeestatus = [];
var employeedepartment = [];
var employeenum = [];
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
//Assignment 3 
// Step 3: Adding "addEmployee" function within data-service.js
// • Create the function "addEmployee(employeeData)" within data-service.js according to the following
// specification: (HINT: do not forget to add it to exports)
// o Like all functions within data-service.js, this function must return a Promise
// o If employeeData.isManager is undefined, explicitly set it to false, otherwise set it to true
// (this gets around the issue of the checkbox not sending "false" if it's unchecked)
// o Explicitly set the employeeNum property of employeeData to be the length of the
// "employees" array plus one (1). This will have the effect of setting the first new employee
// number to 281, and so on.
// o Push the updated employeeData object onto the "employees" array and resolve the
// promise. (you don’t need to resolve any data here.) 

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        if (typeof employeeData.isManager === "undefined") {employeeData.isManager = false;}
        else {employeeData.isManager = true;}
        employeeData.employeeNum = emp.length() + 1;
        emp[emp.length()] = employeeData;
        if (employeeData) resolve(emp);
        else reject("ERROR 404");
    })
}
//-------------------------------------------------------------------------------------------
module.exports.getEmployeesByStatus = function (status) {return new Promise(function (resolve, reject) {
        if (emp.length > 0) {var let = 0;
            // The for in loop iterates over a object
            // Each iteration returns a key (x)
            // The key is used to access the value of the key
            for (var i in emp) {if (emp[i].status == status) {employeestatus[let] = emp[i];
                    let++;
                }
            }resolve(employeestatus);
        }else {reject("no results returned");};
    })
}
//---------------------------------------------------------------------------------------------
module.exports.getEmployeesByDepartment = function (department) {
    return new Promise((resolve, reject) => {
        if (emp.length > 0) {
            var let = 0;
            for (var i in emp) {if (emp[i].department == department) {employeedepartment[let] = emp[i];
                    let++;
                }
            }resolve(employeedepartment);
        }else {reject("no results returned");};
    })
}
//-----------------------------------------------------------------------------------------------
module.exports.getEmployeesByManager = function (manager) {
    return new Promise((resolve, reject) => {
        if (emp.length > 0) {
            var let = 0;
            for (var i in emp) {
                if (emp[i].employeeManagerNum == manager) {employeenum[let] = emp[i];
                    let++;
                }
            }resolve(employeenum);
        }else {reject("no results returned");};
    })
}
//------------------------------------------------------------------------------------------------
module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        if (emp.length > 0) {
            for (var i in emp) {if (emp[i].employeeNum == num) {index = i;}}
            resolve(emp[index]);
        }else {reject("no results returned");};
    })
}
//--------------------------------------------------------------------------------------------------