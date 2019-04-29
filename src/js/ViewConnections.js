import {makeConnections} from "./connections_logic.js";
import {catalogue} from "../Model/cs_major.js";
import {updateProfile} from "./model_to_vm.js";
import {ViewModel} from "./VM_to_View.js";
import {exampleProfile} from "./VM_to_View.js";
import {writeSourceTarget} from "./model_to_vm.js";
import {writeVM} from "./model_to_vm.js";
import {draw} from "./VM_to_View.js";
import {notTaken} from "./VM_to_View.js";

let scope;


let jsPlumbInstance = jsPlumb.getInstance({
    Connector: ["Straight"],
    DragOptions: {cursor: "pointer", zIndex: 5},
    PaintStyle: {stroke: "black", strokeWidth: 1}
});


let setUpDraggable = function () {
    const radius = 20;
    const displacement = radius + 10;

    //Set up jsPlumb. jsPlumbInstance will be the variable which controls jsPlumb draggable behavior.

    jsPlumb.Defaults.MaxConnections = 10;

    //Make courses draggable
    var svgNotTaken = $("#svgNotTaken");
    var graph = $("#graph");
    var outGraph = $(".outGraph");
    var graphCourses = $(".inGraph");
    var allCourses = $(".draggable");

    outGraph.draggable({revert: true});
    jsPlumbInstance.draggable(graphCourses);

    graphCourses.bind("click", function () {
        scope = $(this);
    });

    /*            DRAGGABLE BEHAVIOR           */
    graph.droppable({
        accept: ".outGraph",
        drop: function (e, ui) {

            console.log("I DROPPED A CLASS");
            console.log(e);
            console.log(event.clientX + "," + event.clientY);
            console.log(exampleProfile);
            let offsetHeight = $("#graph").height();
            let offsetWidth = $("#graph").width();
            updateProfile(exampleProfile, ui.helper.attr('id'),
                        event.clientY - displacement, event.clientX-displacement);
            let connectionsArray = writeSourceTarget(exampleProfile);

            //should this be delete is and any prereqs inside the bar too?
            for (let prereq of exampleProfile){
                if (prereq.status === "planned"){
                    let element = document.getElementById(prereq.course);
                    if (element != null){
                        element.parentNode.removeChild(element);
                    }
                }
            }

            // let element = document.getElementById(ui.helper.attr('id'));
            // element.parentNode.removeChild(element);

            let ViewModel = writeVM(exampleProfile, connectionsArray);

            console.log("Here is the generated ViewModel");
            console.log(ViewModel);

            draw(ViewModel);
            jsPlumbInstance.reset();
            drawConnections(ViewModel.Connections);

            var graphCourses = $(".inGraph");
            jsPlumbInstance.draggable(graphCourses, {disabled:true});

        }
    });
};


let drawConnections = function (Connections) {
    initializeConnections(Connections);
    instructionsBinding();
    jsPlumb.fire("jsPlumbDemoLoaded", jsPlumbInstance);
};

//-----------     HELPER FUNCTIONS     -----------

//Draw the connections between imported courses.
function initializeConnections(Connections) {
    for (let entry of Connections) {
        jsPlumbInstance.connect({
            source: entry.source,
            target: entry.target,
            endpoint: "Blank",
            anchors: [
                ["Perimeter", {shape: "Circle", anchorCount: 150}],
                ["Perimeter", {shape: "Circle", anchorCount: 150}]
            ],
            overlays: [
                ["Arrow", {location: 1}]
            ]
        })
    }
}

function instructionsBinding() {
    let allCourses = $(".draggable");
    allCourses.bind("mousedown", function () {
        //change CSS to absolute so it can drag
        var course = findCourse(catalogue, this);
        var prereq = course.prereq;
        var description = course.courseInfo;
        var name = course.name;
        var title = course.dept + course.courseNum;
        $("#welcomeText").remove();
        $("#name").replaceWith("<p id='name'>" + title + "<br>" + name + "</p>");
        $("#courseDescription").replaceWith(
            "<p id='courseDescription'>" + description + "</p>"
        );
        $("#prereq").replaceWith(
            "<p id='prereq'>" + prereq + "</p>"
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
};

export {drawConnections, scope, jsPlumbInstance, setUpDraggable}