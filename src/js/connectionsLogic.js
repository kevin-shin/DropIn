import { courseCatalog } from "./prereq_dictionary.js";
// const courseCatalog = require("./prereq_dictionary.js");

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

export { dfs };
// module.exports = {};
// module.exports.makeConnections = makeConnections;
// module.exports.reset = resetConnectionsArrays;
// module.exports.dfs = dfs;

