import { catalogue } from "../Model/cs_major.js";
import { Profile, draw  } from "./VMtoView.js";
import { addCourseToProfile, removeCourseFromProfile } from "./profileManipulation.js";
import { makeViewModel } from "./makeViewModel.js";

let focus;

let jsPlumbInstance = jsPlumb.getInstance({
    Connector: ["Straight"],
    DragOptions: {cursor: "pointer", zIndex: 5},
    PaintStyle: {stroke: "black", strokeWidth: 1}
});

jsPlumb.Defaults.MaxConnections = 10;

let implementDragBehavior = function () {
    const radius = 20;
    const displacement = radius + 10;

    let graph = $("#graph");
    let outGraph = $(".outGraph");
    let graphCourses = $(".inGraph");


    /*            DRAGGABLE BEHAVIOR           */
    outGraph.draggable({revert: true});
    jsPlumbInstance.draggable(graphCourses, {
            containment: "parent"
        });

    graphCourses.bind("click", function () {
        focus = $(this);
    });

    /*           GRAPH DROPPABLE BEHAVIOR             */
    graph.droppable({
        accept: ".outGraph",
        drop: function (e, ui) {

            console.log("-------->  I DROPPED A CLASS");
            console.log("Here is the Profile:");
            console.log(Profile);

            addCourseToProfile(Profile, ui.helper.attr('id'),
                event.clientY - (displacement + 100),
                event.clientX - displacement - 5);

            let ViewModel = makeViewModel(Profile);
            console.log(ViewModel);

            jsPlumbInstance.reset();
            draw(ViewModel);
            drawConnections(ViewModel.Connections);

            var graphCourses = $(".inGraph");
            jsPlumbInstance.draggable(graphCourses, {
                disabled: true,
                containment: "parent"
            });


        }
    });


};


let drawConnections = function (Connections) {
    initializeConnections(Connections);
    instructionsBinding();
    let plannedCourses = $(".draggable, .inGraph, .planned");
    plannedCourses.bind("mousedown", function () {
        focus = $(this);
    });
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

function deleteButton() {
    console.log("DELETE ACTIVATE");
    removeCourseFromProfile(Profile, focus.attr('id'));
    let connectionsArray = writeSourceTarget(Profile);
    let ViewModel = writeVM(Profile, connectionsArray);
    draw(ViewModel);
    console.log("DELETE BUTTON VIEWMODEL");
    console.log(ViewModel);
    jsPlumbInstance.reset();
    drawConnections(ViewModel.Connections);
    console.log("ENDED DELETE");
}

function findCourse(data, course) {
    let ID = course.id;
    for (let object of data) {
        if ((object.dept + object.courseNum) === ID) {
            return object;
        }
    }
}


// $(document).ready(function() {
//     var garbage = $("#garbage");
//     garbage.click(function(){
//         console.log("Garbage clicked");
//     });
//     garbage.on("drop", function(event){
//         event.preventDefault();
//         console.log("Dropped triggered");
//     });
//     garbage.droppable({
//         accept: ".draggable",
//         greedy: true,
//         drop: function(e,ui) {
//             console.log("DELETE ACTIVATE");
//             removeCourseFromProfile(Profile, ui.helper.attr('id'));
//             let connectionsArray = writeSourceTarget(Profile);
//             let ViewModel = makeViewModel(Profile, connectionsArray);
//             draw(ViewModel);
//             console.log(ViewModel);
//             jsPlumbInstance.reset();
//             drawConnections(ViewModel.Connections);
//             console.log("ENDED DELETE");
//         }
//     });
// });


export {drawConnections, focus, jsPlumbInstance, implementDragBehavior, Profile, deleteButton}