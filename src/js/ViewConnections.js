import {makeConnections} from "./connections_logic.js";
import {Connections} from "../Model/connections.js";
import {catalogue} from "../Model/cs_major.js";

let drawConnections = function () {

    const radius = 20;
    const displacement = radius + 10;

    //TODO Reformat with ES6 Imports and Exports
    var courses, arrows;
    //IMPORT DATA
    d3.json("../Model/ViewModel_Test.json").then(function (data) {
        courses = data.Classes;
        arrows = data.Connections;
    });

    //SET UP JSPLUMB. instance will be the variable which controls jsPlumb draggable behavior.
    var instance = jsPlumb.getInstance({
        Connector: ["Straight"],
        DragOptions: {cursor: "pointer", zIndex: 5},
        PaintStyle: {stroke: "black", strokeWidth: 2},
    });

    jsPlumb.Defaults.MaxConnections = 10;

    /*
      Make courses draggable. Notice that the courses inside the top bar and the ones
      in the graph have different programs controlling their drag behavior. This is
      necessary for drag-and-drop to work with line drawing.
     */

    var svgNotTaken = $("#svgNotTaken");
    var graph = $("#graph");
    var outGraph = $(".outGraph");
    var graphCourses = $(".inGraph");
    var allCourses = $(".draggable");

    outGraph.draggable({revert: true});
    instance.draggable(graphCourses);

    /*            DRAGGABLE BEHAVIOR           */
    svgNotTaken.droppable({ accept: '.draggable'});
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
            x.addClass("inGraph").removeClass("outGraph ui-draggable ui-draggable-handlea ui-draggable-dragging");
            graph.append(x);
            instance.draggable(x);
            var item = x.attr('id');

            //Run the prereq algorithms
            let prereqs = makeConnections(item);
            prereqs.forEach(function (course) {
                var insideGraph = graphCourses.toArray().some((element) => element.id === course.source);
                var insideBar = outGraph.toArray().some((element) => element.id === course.source);

                //Algorithm assumes that each course is either inside the graph or bar.
                if (insideBar) {
                    var toRemove = "#" + course.source;
                    var nodeToRemove = $(toRemove);
                    var clone = nodeToRemove.clone();
                    clone.css({
                        top: e.clientY - displacement - 50,
                        left: e.clientX - displacement - 50,
                        position: 'absolute',
                        //opacity: 0.5
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

            //Having transferred courses, call the appropriate drag-enablers.
            outGraph = $(".outGraph");
            graphCourses = $(".inGraph");

            outGraph.draggable({revert: true});
            drawConnections();
            courseUpdate();
        }
    });


    //Behavior to initialize nodes and connections.
    drawConnections();
    courseUpdate();
    jsPlumb.fire("jsPlumbDemoLoaded", instance);


    //-----------     HELPER FUNCTIONS     -----------

    //Draw the connections between imported courses.
    function drawConnections() {
        Connections.forEach((function (entry) {
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

    function courseUpdate() {
        allCourses = $(".draggable");
        allCourses.bind("mousedown", function () {
            var course = findCourse(catalogue, this);
            var description = course.courseInfo;
            var name = course.name;
            var title = course.dept + course.courseNum;
            $("#welcomeText").remove();
            $("#name").replaceWith("<p id='name'>" + title + "<br>" + name + "</p>");
            $("#courseDescription").replaceWith("<p id='courseDescription'>" + description + "</p>");
        });
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