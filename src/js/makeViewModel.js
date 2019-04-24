import {catalogue} from "../Model/cs_major.js";

let makeViewModel = function(profile, connections) {
    let ViewModel = {};
    let Classes = profile;
    let cleanerCatalogue = cleanCatalogue();
    for (let otherCourse of cleanerCatalogue){
        if (!profile.some(data => data.course === otherCourse.course)){
            Classes.push(otherCourse)
        }
    }
    ViewModel.Classes = Classes;
    ViewModel.Connections = connections;
    return ViewModel
};

function cleanCatalogue(){
    let compCourses = [];
    for (let course of catalogue){
        if (course.dept === "COMP") {
            compCourses.push({
                course: course.dept + course.courseNum,
                status: "false"
            })
        }
    }
    return compCourses;
}

export {makeViewModel}