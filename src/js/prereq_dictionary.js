import {courses} from "../Model/cs_major.js";

var prereqDict = new Map();

let makePrereqDict = function (catalogue) {
    for (var course of catalogue) {
        let courseDescription = course.dept + course.courseNum;
        prereqDict.set(courseDescription, course.prereq);
    }
    return prereqDict;
};


let courseCatalog = makePrereqDict(courses);

export {courseCatalog}