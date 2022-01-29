const inquirer = require('inquirer');
const fs = require('fs')
const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const Manager = require("./lib/Manager")
const generateHtml = require("./util/generateHtml")
const team = []

function teamMemberQuestion(){    
    inquirer.prompt([
    {
        type: 'list',
        name: 'role',
        message: "Which type of team member would you like to add?",
        choices:['Engineer','Intern',"No more members"],
    }
    
]).then(answers => {
    switch (answers.role){
        case 'Engineer':
            selectEngineer();
            break;
        case 'Intern':
            selectIntern();
            break;
        default:
            console.log("All Done!")
            console.log(team)
            fs.writeFile(`./dist/index.html`,generateHtml(team),(err) =>{
                if (err) {throw err;} else {console.log('file written!')}
            })
            break;
    }
})
    
} 

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the team manager's id?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the team manager's email?"
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the team manager's office number?"
    },
])

  .then(answers => {
    const manager = new Manager(answers.name,answers.id,answers.email,answers.officeNumber) 
    console.log(manager) 
    team.push(manager)
    generateHtml(team);
    teamMemberQuestion();
  });


  function selectEngineer(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's github?"
        },
        ]).then(answers => {
            const engineer = new Engineer(answers.name,answers.id,answers.email,answers.github)
            console.log(engineer)
            team.push(engineer)
            teamMemberQuestion();
          })
}
function selectIntern(){
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the intern's id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email?"
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the intern's school?"
        },
        ]).then(answers => {
            const intern = new Intern(answers.name,answers.id,answers.email,answers.school)
            console.log(intern)
            team.push(intern)
            teamMemberQuestion();
          
          })
}