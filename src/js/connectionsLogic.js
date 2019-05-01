import { courseCatalog } from "./prereq_dictionary.js";
// const courseCatalog = require("./prereq_dictionary.js");

let makeConnections = function (draggedCourse) {
    let prereqList = dfs(draggedCourse);
    console.log("Prereq List");
    console.log(prereqList);
    return returnedToAdjList(prereqList);

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
    let visited = [];
    let courseStack = [];

    courseStack.push(draggedCourse);
    visitedStack.push(draggedCourse);

    while (courseStack.length !== 0) {
        let v = courseStack.pop();
        for (let child of courseCatalog.get(v)) {
            if (!(child in visited)) {
                dfs(child);
            }
        }
    }

    console.log(returned);
    return returned;
};


// --------- EXPORT  --------- //

export { makeConnections, dfs};
// module.exports = {};
// module.exports.makeConnections = makeConnections;
// module.exports.reset = resetConnectionsArrays;
// module.exports.dfs = dfs;