// import { courses } from "../Model/cs_major.js";

/* makes a prerequisite dictionary based on a JSON object with dept, course number, and prerequisites
 * April 2019
 * Juliet Kelson and Kevin Shin
 */
const courses = require("../Model/cs_major.js");

var prereqDict = new Map();

//Goes through courses and maps them to prerequisites
// takes a catalogue of courses which must include department, course number, and prerequisites
let makePrereqDict = function (catalogue) {
    for (var course of catalogue) {
        let courseDescription = course.dept + course.courseNum;
        prereqDict.set(courseDescription, course.prereq);
    }
    return prereqDict;
};


let courseCatalog = makePrereqDict(courses);

// export { courseCatalog };
module.exports = courseCatalog;

