import { courseCatalog } from "./prereq_dictionary.js";
// const courseCatalog = require("./prereq_dictionary.js");

let makeConnections = function (draggedCourse) {

    return returnedToAdjList(dfs(draggedCourse));
    function returnedToAdjList(returned){
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
    }
};

let dfs = function (draggedCourse) {
    var courseStack = [];
    var visited = [];
    var returned = [];

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


// --------- EXPORT  --------- //

export { makeConnections, dfs};
// module.exports = {};
// module.exports.makeConnections = makeConnections;
// module.exports.reset = resetConnectionsArrays;
// module.exports.dfs = dfs;