// const courseCatalog = require("./prereq_dictionary.js");
var courseStack = [];
var visited = [];
var returned = [];

let makeConnections = function (draggedCourse) {
    return returnedToAdjList(dfs(draggedCourse));
};

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

//connections to adjacency list
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

let resetConnectionsArrays = () => {console.log(courseStack, visited, returned), courseStack = [], visited = [], returned = [], console.log(courseStack, visited, returned)};

export { makeConnections };
// module.exports = {};
// module.exports.makeConnections = makeConnections;
// module.exports.reset = resetConnectionsArrays;