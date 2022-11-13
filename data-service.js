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

//  getEmployeesByStatus(status)
// • This function will provide an array of "employee" objects whose status property matches the status
// parameter (ie: if status is "Full Time" then the array will consist of only "Full Time" employees) using
// the resolve method of the returned promise (i.e., resolve the filtered array).
// • If for some reason, the length of the array is 0 (no results returned), this function must invoke the
// reject method and pass a meaningful message, ie: "no results returned".

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
// getEmployeesByDepartment(department)
// • This function will provide an array of "employee" objects whose department property matches the
// department parameter (ie: if department is 5 then the array will consist of only employees who
// belong to department 5 ) using the resolve method of the returned promise.
// • If for some reason, the length of the array is 0 (no results returned), this function must invoke the
// reject method and pass a meaningful message, ie: "no results returned".
module.exports.getEmployeesByDepartment = function (department) {
    return new Promise((resolve, reject) => {
        if (emp.length > 0) {var let = 0;
            for (var i in emp) {if (emp[i].department == department) {employeedepartment[let] = emp[i];
                    let++;
                }
            }resolve(employeedepartment);
        }else {reject("no results returned");};
    })
}
//-----------------------------------------------------------------------------------------------
// getEmployeesByManager(manager)
// • This function will provide an array of "employee" objects whose employeeManagerNum property
// matches the manager parameter (ie: if manager is 14 then the array will consist of only employees
// who are managed by employee 14 ) using the resolve method of the returned promise (i.e., resolve
// the filtered array).
// 9
// • If for some reason, the length of the array is 0 (no results returned), this function must invoke the
// reject method and pass a meaningful message, ie: "no results returned"
module.exports.getEmployeesByManager = function (manager) {
    return new Promise((resolve, reject) => {
        if (emp.length > 0) {var let = 0;
            for (var i in emp) {
                if (emp[i].employeeManagerNum == manager) {employeenum[let] = emp[i];
                    let++;
                }
            }resolve(employeenum);
        }else {reject("no results returned");};
    })
}
//------------------------------------------------------------------------------------------------
// getEmployeeByNum(num)
// • This function will provide a single "employee" object whose employeeNum property matches the
// num parameter (ie: if num is 261 then the "employee" object returned will be "Glenine Focke" ) using
// the resolve method of the returned promise (i.e., resolve the filtered ONE object).
// • If for some reason, there is no result, this function must invoke the reject method and pass a
// meaningful message, ie: "no results returned".
module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        if (emp.length > 0) {for (var i in emp) {if (emp[i].employeeNum == num) {index = i;}}
            resolve(emp[index]);
        }else {reject("no results returned");};
    })
}
//--------------------------------------------------------------------------------------------------
// employeeNum: type: "hidden", name: "employeeNum"
// o Email: type: "email", name: "email"
// o Social Security Number: type: "text", name: "SSN", readonly
// o Address (Street): type: "text", name: "addressStreet"
// o Address (City): type: "text", name: "addressCity"
// o Address (State): type: "text", name: "addressState"
// o Address (Zip Code): type: "text", name: "addressPostal"
// o Manager: type: "checkbox", name: "isManager", (HINT: use the #if helper -
// {{#if data.isManager}} … {{/if}} to see if the checkbox should be checked or not)
// o Employee's Manager Number: type: "text", name: "employeeManagerNum"
// o Status: type: "radio" name: "status", values: "Full Time" or "Part Time" (HINT, use the
// #equals helper - {{#equal data.status "Full Time" }} checked {{/equal}} , to see if Full Time
// or Part Time is checked)
// 10
// o Department type: "select", name: "department", values: 1 - 7 inclusive (HINT, use the
// #equals helper - {{#equal data.department "1" }} selected {{/equal}} for each option to
// determine which <option> should be selected)
// o Hire Date type: "text", name: "hireDate", readonly
module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        if (employees.length > 0) {
            for (var i in employees) {
                if (employees[i].SSN == employeeData.SSN) {employees[i].firstName = employeeData.firstName;
                    employees[i].lastName = employeeData.lastName;
                    
                    employees[i].email = employeeData.email
                    
                    employees[i].SSN = employeeData.SSN
                    
                    employees[i].addressStreet = employeeData.addressStreet
                    
                    employees[i].addressCity = employeeData.addressCity
                    
                    employees[i].addressState = employeeData.addressState
                    
                    employees[i].addressPostal = employeeData.addressPostal
                    
                    employees[i].Manager = employeeData.Manager
                    
                    employees[i].employeeManagerNum = employeeData.employeeManagerNum
                    
                    employees[i].status = employeeData.status
                    
                    employees[i].department = employeeData.department
                    
                    employees[i].hireDate = employeeData.hireDate                    
                }
            }
            resolve();
        }
        else {reject("no results");}
    })
}