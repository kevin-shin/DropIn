import {makeConnections} from "./connections_logic.js";

let drawConnections = function () {
    //GLOBAL VARIABLES
    const radius = 20;
    const displacement = radius + 10;

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


    var courses, arrows, catalog;
    //IMPORT DATA
    d3.json("../Model/ViewModel_Test.json").then(function (data) {
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
    jsPlumb.Defaults.MaxConnections = 5;

    /*Make courses draggable. Notice that the courses inside the top bar and the ones
      in the graph have different programs controlling their drag behavior. This is
      necessary for drag-and-drop to work with line drawing.
     */

    var svgNotTaken = $("#svgNotTaken");
    var graph = $("#graph");
    var outGraph = $(".outGraph");
    var graphCourses = $(".inGraph");

    outGraph.draggable({revert: true});
    instance.draggable(graphCourses);

    //DECLARE DRAGGABLE BEHAVIOR
    svgNotTaken.droppable({
            accept: '.draggable'
        }
    );
    graph.droppable({
        accept: ".outGraph",
        drop: function (e, ui) {
            var x = ui.helper.clone();
            ui.helper.remove();
            x.css({
                top: e.clientY - displacement,
                left: e.clientX - displacement,
                position: 'absolute'
            });
            x.addClass("inGraph").removeClass("outGraph ui-draggable ui-draggable-handle ui-draggable-dragging");
            graph.append(x);
            instance.draggable(x);
            var item = x.attr('id');

            //Run the prereq algorithms
            let prereqs = makeConnections(item);
            prereqs.forEach(function (course) {
                var insideGraph = graphCourses.toArray().some((element) => element.id === course.source);
                var insideBar = outGraph.toArray().some((element) => element.id === course.source);

                if (insideBar) {
                    var toRemove = "#" + course.source;
                    var nodeToRemove = $(toRemove);
                    var clone = nodeToRemove.clone();
                    clone.css({
                        top: e.clientY - displacement - 50,
                        left: e.clientX - displacement - 50,
                        position: 'absolute'
                    });
                    clone.addClass("inGraph").removeClass("outGraph ui-draggable ui-draggable-handle");
                    nodeToRemove.remove();
                    $("#graph").append(clone);
                    instance.draggable(clone);
                    instance.connect({
                        source: clone.attr('id'),
                        target: course.target,
                        endpoint: "Blank",
                        anchors: [
                            ["Perimeter", {shape: "Diamond", anchorCount: 150}],
                            ["Perimeter", {shape: "Diamond", anchorCount: 150}]
                        ]
                    });

                }
                if (insideGraph) {
                    instance.connect({
                        source: course.source,
                        target: course.target,
                        endpoint: "Blank",
                        anchors: [
                            ["Perimeter", {shape: "Diamond", anchorCount: 150}],
                            ["Perimeter", {shape: "Diamond", anchorCount: 150}]
                        ]
                    });
                }
            });

            outGraph = $(".outGraph");
            graphCourses = $(".inGraph");

            outGraph.draggable({revert: true});
            drawConnections();

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

    drawConnections();
    jsPlumb.fire("jsPlumbDemoLoaded", instance);


    //-----------     HELPER FUNCTIONS     -----------

    //Draw the connections between imported courses.
    function drawConnections() {
        sourceTarget.forEach((function (entry) {
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
};

export {drawConnections}