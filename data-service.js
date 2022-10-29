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
var empstatus = [];
var empdepart = [];
var empmanagenum = [];
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
module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        if (typeof employeeData.isManager === "undefined") {
            employeeData.isManager = false;
        }
        else {
            employeeData.isManager = true;
        }

        employeeData.employeeNum = emp.length() + 1;
        emp[emp.length()] = employeeData;

        if (employeeData) resolve(emp);
        else reject("error adding post");
    })

}
//-------------------------------------------------------------------------------------------
exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
        if (emp.length > 0) {
            var x = 0;
            for (var i in emp) {
                if (emp[i].status == status) {
                    empstatus[x] = emp[i];
                    x++;
                }
            }
            resolve(empstatus);
        }
        else {
            reject("no results returned");
        };
    })
}

exports.getEmployeesByDepartment = function (department) {
    return new Promise((resolve, reject) => {
        if (emp.length > 0) {
            var x = 0;
            for (var i in emp) {
                if (emp[i].department == department) {
                    empdepart[x] = emp[i];
                    x++;
                }
            }
            resolve(empdepart);
        }
        else {
            reject("no results returned");
        };
    })
}

exports.getEmployeesByManager = function (manager) {
    return new Promise((resolve, reject) => {
        if (emp.length > 0) {
            var x = 0;
            for (var i in emp) {
                if (emp[i].employeeManagerNum == manager) {
                    empmanagenum[x] = emp[i];
                    x++;
                }
            }
            resolve(empmanagenum);
        }
        else {
            reject("no results returned");
        };
    })
}

exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        
        if (emp.length > 0) {
            for (var i in emp) {
                if (emp[i].employeeNum == num) {
                    index = i;
                }
            }

            resolve(emp[index]);
        }
        else {
            reject("no results returned");
        };
    })
}