
//stack of all prereqs for dragged course

let courses_stack = [];

count = 0;
let connections = function(dragged_class){
    if (dragged_class.prereq[count] != null) {
        current = prereq_dict[dragged_class][count];
        courses_stack[current] = [dragged_class];
        connections(current);
    }
    else {
        count++;
        connections(dragged_class);
    }
}

var adj_list = [];

//connections to adjacency list
for (var course of connections) {
    adj_list[i] = [connections[course], course]
}


