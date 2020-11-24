const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function askquestions() {
    const res = await inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the employee's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: ["Intern", "Engineer", "Manager"]
        }
    ]);
    switch (res.role) {
        case "Intern":
            const school = await inquirer.prompt([{
                type: "input",
                name: "schoolNanme",
                message: "Which school did the Intern attend?"
            }]);
            employees.push(
                new Intern(res.name, res.id, res.email, school.schoolName)
            );
            addAnotherEmployee();
            break;
        case "Engineer":
            const gitHub = await inquirer.prompt([{
                type: "input",
                name: "gitHubUserName",
                message: "What is the engineer's github username?"
            }]);
            employees.push(
                new Engineer(res.name, res.id, res.email, gitHub.gitHubUserName)
            );
            addAnotherEmployee();
            break;
        case "Manager":
            const phone = await inquirer.prompt([{
                type: "input",
                name: "officeNumber",
                message: "What is the manager's office number?"
            }]);
            employees.push(
                new Manager(res.name, res.id, res.email, phone.officeNumber)
            );
            addAnotherEmployee();
            break;
        default:
    }
}

askquestions();

async function addAnotherEmployee() {
    const addMoreEmployee = await inquirer.prompt([{
        type: "confirm",
        name: "addAgain",
        message: "Do you want to add another employee?"
    }]);
    addMoreEmployee.addAgain == true ? askquestions() : buildTeam(employees);
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function buildTeam(employees) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8");
}


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```