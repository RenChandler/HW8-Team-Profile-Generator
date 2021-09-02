const Manager= require("./lib/Manager")
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")

const inquire = require("inquirer")
const fs = require("fs")
const path = require("path")

const team = [];

const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the manager?', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("What is the name of the manager?");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their id?', 
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log ("What is their id?");
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email?', 
            validate: email => {
                valid =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ("What is their email?");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is their office number?', 
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log ("What is their office number?");
                    return false; 
                    
                } 
                else {
                    return true;
                }
            }
        },
    ]).then(managerInput => {
        const {name,id, email, officeNumber}= managerInput
        const manager = new Manager(name, id, email, officeNumber)

        team.push(manager)
        console.log("manager")

    })
};
const addEmployee = () => {
    return inquierer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the employee',
            choices: ['Engineer','Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee?', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("What is the name of the employee?");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their id?', 
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log ("What is their id?");
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email?', 
            validate: email => {
                valid =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ("What is their email?");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is their gibhub username?', 
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log ("What is their username?");
                    return false; 
                    
                } 
                else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'Where did they go to school?', 
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log ("Where did they go to school?");
                    return false; 
                    
                } 
                else {
                    return true;
                }
            }
        },
    ]).then(employeeData => {
        let {name, id, email, github, school} = employeeData
        let employee;

        if (role === "Engineer"){
            employee = new Engineer (name, id, email, github);
            console.log(employee)
        }
        else {
            employee = new Intern(name, id, email, school)
        }
        team.push(employee);

        if (confirmAddEmployee) {
            return addEmployee(team); 
        } else {
            return team;
        }
    })
};

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {

        if (err) {
            console.log(err);
            return;

        } else {
            console.log("Team profile created!")
        }
    })
}; 

addManager()
    .then(addEmployee)
    .then(team =>{
        return generateHTML(team)
    }).then(page =>{
        return writeFile(page)
    }
        ).catch(err => {
            console.log(err)
        })


