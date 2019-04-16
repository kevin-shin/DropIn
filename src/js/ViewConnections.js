import {makeConnections} from "./connections_logic.js";
import {Connections} from "../Model/connections.js";
import {catalogue} from "../Model/cs_major.js";

var scope;

let drawConnections = function () {
    const radius = 20;
    const displacement = radius + 10;

    //TODO Reformat with ES6 Imports and Exports
    var courses;
    d3.json("../Model/ViewModel_Test.json").then(function (data) {
        courses = data.Classes;
    });

    //Set up jsPlumb. jsPlumbInstance will be the variable which controls jsPlumb draggable behavior.
    var jsPlumbInstance = jsPlumb.getInstance({
        Connector: ["Straight"],
        DragOptions: {cursor: "pointer", zIndex: 5},
        PaintStyle: {stroke: "black", strokeWidth: 1}
    });

    jsPlumb.Defaults.MaxConnections = 10;

    //Make courses draggable
    var svgNotTaken = $("#svgNotTaken");
    var graph = $("#graph");
    var outGraph = $(".outGraph");
    var graphCourses = $(".inGraph");
    var allCourses = $(".draggable");

    outGraph.draggable({revert: true});
    jsPlumbInstance.draggable(graphCourses);

    graphCourses.bind("click", function(){
       scope = $(this);
    });

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
            x.addClass("inGraph").removeClass("outGraph ui-draggable ui-draggable-handle ui-draggable-dragging");
            graph.append(x);
            jsPlumbInstance.draggable(x);
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
                        opacity: 0.5
                    });
                    clone.addClass("inGraph").removeClass("outGraph ui-draggable ui-draggable-handle");
                    nodeToRemove.remove();
                    $("#graph").append(clone);
                    jsPlumbInstance.draggable(clone);
                    jsPlumbInstance.connect({
                        source: clone.attr('id'),
                        target: course.target,
                        endpoint: "Blank",
                        anchors: [
                            ["Perimeter", {shape: "Circle", anchorCount: 150}],
                            ["Perimeter", {shape: "Circle", anchorCount: 150}]
                        ],
                        overlays:[
                            ["Arrow",  {location: 1} ]
                        ]
                    });
                }
                if (insideGraph) {
                    jsPlumbInstance.connect({
                        source: course.source,
                        target: course.target,
                        endpoint: "Blank",
                        anchors: [
                            ["Perimeter", {shape: "Circle", anchorCount: 150}],
                            ["Perimeter", {shape: "Circle", anchorCount: 150}]
                        ],
                        overlays:[
                            ["Arrow",  {location: 1} ]
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

            graphCourses.bind("click", function(){
                scope = $(this);
            });

        }
    });

    //Behavior to initialize nodes and connections.
    drawConnections();
    courseUpdate();
    jsPlumb.fire("jsPlumbDemoLoaded", jsPlumbInstance);

    //-----------     HELPER FUNCTIONS     -----------

    //Draw the connections between imported courses.
    function drawConnections() {
        for(let entry of Connections) {
            jsPlumbInstance.connect({
                source: entry.source,
                target: entry.target,
                endpoint: "Blank",
                anchors: [
                    ["Perimeter", {shape: "Circle", anchorCount: 150}],
                    ["Perimeter", {shape: "Circle", anchorCount: 150}]
                ],
                overlays:[
                    ["Arrow",  {location: 1} ]
                ]
            })
        }
    }

    function courseUpdate() {
        allCourses = $(".draggable");
        allCourses.bind("mousedown", function () {
            var course = findCourse(catalogue, this);
            var prereq = course.prereq.toString();
            var description = course.courseInfo;
            var name = course.name;
            var title = course.dept + course.courseNum;
            $("#welcomeText").remove();
            $("#name").replaceWith("<p id='name'>" + title + "<br>" + name + "</p>");
            $("#courseDescription").replaceWith(
                "<p id='courseDescription'>" + description + "</p>" +
                "<p>" + prereq + "</p>"
            );
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

    function checkRequirementBoxes(classAdded) {
        let boxToBeChecked = d3.select("#requirements").select(classAdded);
        if(!($(boxToBeChecked).checked)){//if the box is not checked
            $(boxToBeChecked).toggle(this.checked)
        }
    }


};

export {drawConnections, scope}