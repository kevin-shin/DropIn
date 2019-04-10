$(document).ready(function () {

    //GLOBAL VARIABLES
    const radius = 20;
    const displacement = radius + 10;

    var courses, arrows, catalog;
    //IMPORT DATA
    d3.json("./ViewModel_Test.json").then(function (data) {
        courses = data.Classes;
        arrows = data.Connections;
    });
    d3.json("../Model/CS_major.json").then(function (data) {
        catalog = data;
    });

    //SET UP JSPLUMB. instance will be the variable which controls jsPlumb draggable behavior.
    var instance = jsPlumb.getInstance({
        Connector: ["Straight"],
        DragOptions: {cursor: "pointer", zIndex: 5},
        PaintStyle: {stroke: "black", strokeWidth: 2},
    });

    /*Make courses draggable. Notice that the courses inside the top bar and the ones
      in the graph have different programs controlling their drag behavior. This is
      necessary for drag-and-drop to work with line drawing.
     */
    var availableCourses = $(".draggable.available");
    var graphCourses = $(".inGraph");

    availableCourses.draggable({revert: true});
    instance.draggable(graphCourses);

    //DECLARE DRAGGABLE BEHAVIOR
    $("#svgNotTaken").droppable({accept: '.draggable'});
    $("#graph").droppable({
        drop: function (e, ui) {
            var x = ui.helper.clone();
            ui.helper.remove();
            x.css({
                top: e.clientY - displacement,
                left: e.clientX - displacement,
                position: 'absolute'
            });
            x.addClass("inGraph");
            $("#graph").append(x);

            var courseStack = [];
            var visited = [];
            var returned = [];

            let dfs = function (draggedCourse) {
                courseStack.push(draggedCourse);
                visited.push(draggedCourse);

                while (courseStack.length !== 0) {
                    var v = courseStack.pop();
                    returned.push(v);
                    for (var child of prereqDict.get(v)) {
                        if (!(child in visited)) {
                            dfs(child);
                        }
                    }
                }
            };

            var adjList = [];

//connections to adjacency list
            let returnedToAdjList = function () {
                for (var course of returned) {
                    var prereqs = prereqDict.get(course);
                    for (var prereq of prereqs) {
                        if (!adjList.some((adj) => adj.source === prereq && adj.target === course)) {
                            adjList.push({
                                "source": prereq,
                                "target": course
                            });
                        }
                    }
                }
                returned = [];
            };

            let makeConnections = function(draggedCourse) {
                var courseStack = [];
                var visited = [];
                var returned = [];

                dfs(draggedCourse);
                returnedToAdjList();
            };


            //JULIET'S ALGORITHM HERE
            /*
            Pseudocode

            let prereqs = array of courses returned by prereq algorithm
            for prereq in prereqs:
                if prereq on graph already:
                    draw line from that prereq to dropped node (x)
                else:
                    add node, in transparent red. Think about how you want to place it.
                    draw connection between that node and this node.
                    something about updating profiles.

            */

            availableCourses = $(".draggable.available");
            graphCourses = $(".inGraph");

            availableCourses.draggable({revert: true});
            instance.draggable(graphCourses);
        }
    });

    $(".draggable").bind("mousedown", function () {
        var course = findCourse(catalog, this);
        var description = course.courseInfo;
        var name = course.name;
        var title = course.dept + course.courseNum;
        $("#name").replaceWith("<p id='name'>" + title + "<br>" + name + "</p>");
        $("#courseDescription").replaceWith("<p id='courseDescription'>" + description + "</p>");
    });

    let sourceTarget = [
        {
            source: "COMP123",
            target: "COMP127"
        },
        {
            source: "COMP127",
            target: "COMP128"
        },
        {
            source: "COMP128",
            target: "COMP221"
        },
        {
            source: "MATH279",
            target: "COMP221"
        },
        {
            source: "COMP128",
            target: "COMP240"
        }
    ];

    initializeConnections(sourceTarget);
    jsPlumb.fire("jsPlumbDemoLoaded", instance);



    //-----------     HELPER FUNCTIONS     -----------

    //Draw the connections between imported courses.
    function initializeConnections(connections) {
        connections.forEach((function (entry) {
            instance.connect({
                source: entry.source,
                target: entry.target,
                endpoint: "Blank",
                anchors: [
                    ["Perimeter", {shape: "Diamond", anchorCount: 150}],
                    ["Perimeter", {shape: "Diamond", anchorCount: 150}]
                ]
            })
        }));
    }

    function findCourse(data, course) {
        let ID = course.id;
        for (let object of data) {
            if ((object.dept + object.courseNum) === ID) {
                return object;
            }
        }
    }
});