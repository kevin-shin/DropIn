import {catalogue} from "../Model/cs_major.js";
import {courseCatalog} from "./prereq_dictionary.js";

// const courseCatalog = require("./prereq_dictionary.js");
// const catalogue = require("../Model/cs_major.js");

/*
@param
profile: A Profile object
output: a ViewModel, where the Classes property holds an array of classes (profile) and the Connections property holds
an array of the associated connections between the courses.
 */
let makeViewModel = function (profile) {
    let ViewModel = {};
    ViewModel.Classes = profile;
    ViewModel.Connections = writeSourceTarget(profile);
    return ViewModel;
};

/*
@param
profile: A Profile object
output: An array of objects, each with a source and target property, representing one connection, as given by the
information from courseCatalog. The function filters out connections between two taken courses.
 */
function writeSourceTarget(profile) {
    let connections = [];
    for (let course of profile) {
        let coursePrereqs = courseCatalog.get(course.course);
        for (let prereq of coursePrereqs) {
            if (profile.some((course) => course.course === prereq))
                connections.push({
                    "source": prereq,
                    "target": course.course
                });
        }
    }

    //Get rid of connections between two taken courses
    let newConnections = [];
    for (let connection of connections){
        let sourceCourse = profile.filter(course => course.course === connection.source);
        let targetCourse = profile.filter(course => course.course === connection.target);
        if (!(sourceCourse[0].status === "taken" && targetCourse[0].status === "taken")){
            newConnections.push(connection);
        }
    }
    return newConnections;
}

//Helper method to return an array of courses in the catalog with only their IDs.
//This function is used when the only information necessary is an array with strings of all courses (see VMtoView.js)
function cleanCatalogue() {
    let compCourses = [];
    for (let course of catalogue) {
            compCourses.push(course.dept + course.courseNum)
    }
    return compCourses;
}


export {makeViewModel, cleanCatalogue};
// module.exports = writeSourceTarget;