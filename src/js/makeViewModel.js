import {catalogue} from "../Model/cs_major.js";
import {courseCatalog} from "./prereq_dictionary.js";


let makeViewModel = function (profile) {
    let ViewModel = {};
    ViewModel.Classes = profile;
    ViewModel.Connections = writeSourceTarget(profile);
    return ViewModel;
};

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

function cleanCatalogue() {
    let compCourses = [];
    for (let course of catalogue) {
        if (course.dept === "COMP") {
            compCourses.push(course.dept + course.courseNum)
        }
    }
    return compCourses;
}


export {makeViewModel, cleanCatalogue};