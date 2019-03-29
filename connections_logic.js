
//stack of all prereqs for dragged course

let courses_stack = [];

var count = 0;
let connections2 = function (dragged_class) {
    if (dragged_class.findIndex(prereq_dict.dragged_class[count]) != prereq_dict.dragged_class.length + 1 ) {
        current = prereq_dict[dragged_class][count];
        courses_stack[current] = [dragged_class];
        connections2(current);
    }
    else {
        count++;
        connections2(dragged_class);
    }
}

var adj_list = [];

//connections to adjacency list
for (var course of connections) {
    for (var prereq of course) {
        adj_list += [source = prereq, target = course]
    }
}


