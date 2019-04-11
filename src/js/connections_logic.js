import {courseCatalog} from "./prereq_dictionary.js";

let makeConnections = function(draggedCourse) {


    let returned = dfs(draggedCourse);
    return returnedToAdjList(returned);
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


export { makeConnections }