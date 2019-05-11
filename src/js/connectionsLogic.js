import {courseCatalog} from "./prereq_dictionary.js";
// const courseCatalog = require("./prereq_dictionary.js");

/*
@param  draggedCourse: the ID of a course dragged onto the graph
        output: an array containing the courseID, as well as the IDs of any associated prereqs, and prereqs of those prereqs.

Used to calculate which courses should pop-up on the graph having dropped a course.
 */
let dfs = function (draggedCourse) {
    let visitedStack = [];
    let courseStack = [];

    courseStack.push(draggedCourse);
    visitedStack.push(draggedCourse);

    while (courseStack.length !== 0) {
        let v = courseStack.pop();
        for (let child of courseCatalog.get(v)) {
            visitedStack.push(child);
            if (!(child in visitedStack)) {
                courseStack.push(child);
            }
        }
    }
    return visitedStack;
};


// --------- EXPORT  --------- //

export {dfs};
// module.exports = dfs;

