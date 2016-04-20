var builder = require('botbuilder');
var prompts = require('../prompts');
var data = require('../data.json');

var education = data.education;
var work = data.work;
var awards = data.awards;
var skills = data.skills;
var contact = data.basic;



// Export Command Dialog
module.exports = new builder.CommandDialog()
    .matches('^(hello|hi|howdy|hey)', [
        function (session) {
            if (session.userData.name) {
                session.send(prompts.welcomeback, {name: session.userData.name});
                session.send(prompts.nameSaved, {name: session.userData.name});
            } else {
                builder.Prompts.text(session, 'Hi! What is your name?');
            }
        },
        function (session, results) {
            session.userData.name = results.response;
            session.send(prompts.nameSaved, {name: session.userData.name});
            session.send(prompts.welcomeMessage, {name: session.userData.name});
            session.endDialog();
        }
    ])
    .matches('^(Education|School|College)', getEducation)
    .matches('^(Work|Experience|Position)', getWork)
    .onDefault(builder.DialogAction.send("Sorry I didn't understand that"));

function getEducation(session){
    var list = '';
    for(i = 0; i < education.length; i++) {
        list += session.gettext(prompts.listItem, {school: education[i].institution});
    }
    session.send(prompts.listSchoolList, list);
}

function getWork(session){
    var list = '';
    for(i = 0; i < work.length; i++) {
        list += session.gettext(prompts.listWorkItem, {company: work[i].company, title:work[i].position, summary:work[i].summary});
    }
    session.send(prompts.listWorkList, list);
}

function getAwards(session){
    
}

function getSkills(session){
    
}

function getContact(session){
    
}