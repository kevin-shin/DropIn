// import { courseCatalog } from "./prereq_dictionary.js";

/*Logic to make connections between courses for the view model
 *inludes functions: dfs(draggedCourse), returnedToAdjList(returned), makeConnections(draggedCourse), resetConnectionsArrays()
 * make connections uses both functions to out put an object of source, target pairs
 * example: [{source: COMP123, target: COMP124}, {source: COMP124, target: COMP225}]
 * Juliet Kelson and Kevin Shin
 */

const courseCatalog = require("./prereq_dictionary.js");
var courseStack = [];
var visited = [];
var returned = [];

let makeConnections = function (draggedCourse) {
    return returnedToAdjList(dfs(draggedCourse));
};

/*depth first search on prerequisites for class via the courseCatalog (from prereq_dictionary.js).
*takes a course as a string ("COMP123", "MATH155", etc)
* Outputs an array of courses
*/
let dfs = function (draggedCourse) {
    courseStack.push(draggedCourse);
    visited.push(draggedCourse);

    while (courseStack.length !== 0) {
        var v = courseStack.pop();
        returned.push(v);
        for (var child of courseCatalog.get(v)) {
            if (!(child in visited)) {
                dfs(child);
            }
        }
    }
    return returned;
};

/*connections to adjacency list
*takes array from dfs function and outputs an object of source, target pairs
* example: [{ source: COMP123, target: COMP124 }, { source: COMP124, target: COMP225 }]
*/
let returnedToAdjList = function (returned) {
    var adjList = [];
    for (var course of returned) {
        var prereqs = courseCatalog.get(course);
        for (var prereq of prereqs) {
            if (!adjList.some((adj) => adj.source === prereq && adj.target === course)) {
                adjList.push({
                    "source": prereq,
                    "target": course
                });
            }
        }
    }
    return adjList;
};


//empties all arrays for testing purposes
let resetConnectionsArrays = () => {console.log(courseStack, visited, returned), courseStack = [], visited = [], returned = [], console.log(courseStack, visited, returned)};

// export { makeConnections };

module.exports = {}
module.exports.makeConnections = makeConnections;
module.exports.reset = resetConnectionsArrays;