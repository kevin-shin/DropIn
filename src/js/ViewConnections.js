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

            updateProfile(exampleProfile, ui.helper.attr('id'));
            let connectionsArray = writeSourceTarget(exampleProfile);

            console.log("Profile");
            console.log(exampleProfile);

            console.log("connections");
            console.log(connectionsArray);

            let VM = writeVM(exampleProfile, connectionsArray);
            console.log("VM");
            console.log(VM);

            console.log("VM Classes");
            console.log(VM.Classes);
            console.log("not taken");
            let newOtherClasses = notTaken(VM.Classes);

            draw(newOtherClasses, VM.Classes);

            jsPlumbInstance.draggable($(ui.helper.attr('id')));
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