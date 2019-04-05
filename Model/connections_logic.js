var courseStack = [];
var visited = [];
var returned = [];


let dfs = function (draggedCourse){
    courseStack.push(draggedCourse);
    visited.push(draggedCourse);

    while (courseStack.length != 0) { 
        var v = courseStack.pop();
        returned.push(v);
        for (var child of prereqDict.get(v)) {
            if (!(child in visited)) {
                dfs(child);
            }
        }
    }
}

courseStack = [];
visited = [];
var adjList = [];

//connections to adjacency list
let returnedToAdjList = function (returned) {
    for (var course of returned) {
        var prereqs = prereqDict.get(course);
        for (var prereq of prereqs) {
            if (!(prereq in adjList)){
                adjList.push({
                    "source": prereq,
                    "target": course
                });
            }
        }
    }
    returned = [];
}

makeConnections = function (draggedCourse) {
    var courseStack = [];
    var visited = [];
    var returned = [];

    dfs(draggedCourse);
    courseStack = [];
    visited = [];
    returnedToAdjList(returned);
}