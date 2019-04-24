import {catalogue} from "../Model/cs_major.js";

function cleanCatalogue() {
    let compCourses = [];
    for (let course of catalogue){
        if (course.dept === "COMP") {
            compCourses.push( course.dept + course.courseNum )
        }
    }
    return compCourses;
}

export {cleanCatalogue}