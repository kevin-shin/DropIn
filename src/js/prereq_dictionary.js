import {catalogue} from "../Model/cs_major.js";
// const catalogue = require("../Model/cs_major.js");


/*
Makes a prerequisite dictionary based on a Javascript object with dept, course number, and prerequisites.
 */

var prereqDict = new Map();
//Goes through courses and maps them to prerequisites
// takes a catalogue of courses which must include department, course number, and prerequisites

/*
@param
catalogue: Data structure imported from cs_major.js
output: Javascript Map, where keys are courses and values are arrays with prereqs.
 */
let makePrereqDict = function (catalogue) {
    for (var course of catalogue) {
        let courseDescription = course.dept + course.courseNum;
        //.flat() gives prereqs with path options as a single array
        prereqDict.set(courseDescription, course.prereq.flat());
    }
    return prereqDict;
};

let courseCatalog = makePrereqDict(catalogue);


export {courseCatalog};
// module.exports = courseCatalog;
