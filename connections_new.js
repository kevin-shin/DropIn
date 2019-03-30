var course_stack = [];
var visited = [];
var returned = [];

let dfs = function (dragged_course){
    course_stack.push(dragged_course);
    visited.push(dragged_course);

    while (course_stack.length != 0) { 
        var v = course_stack.pop();
        returned.push(v);
        for (var child of prereq_dict.get(v)) {
            if (!(child in visited)) {
                dfs(child);
            }
        }
    }
}

var adj_list = [];

//connections to adjacency list
returned_to_adj_list = function (returned) {
    for (var course of returned) {
        var prereqs = prereq_dict.get(course);
        for (var prereq of prereqs) {
            adj_list.push({
                "source": prereq,
                "target": course
            });
        }
    }
}