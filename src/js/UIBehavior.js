import {catalogue} from "../Model/cs_major.js";
import {Profile, draw} from "./VMtoView.js";
import {addCourseToProfile, removeCourseFromProfile, markasTaken, markasPlanned} from "./profileManipulation.js";
import {makeViewModel} from "./makeViewModel.js";

let focus;

let displacementX;
let displacementY;

let jsPlumbInstance = jsPlumb.getInstance({
    Connector: ["Straight"],
    DragOptions: {cursor: "pointer", zIndex: 5},
    PaintStyle: {stroke: "black", strokeWidth: 1}
});

jsPlumb.Defaults.MaxConnections = 10;

console.log("----> I am loading");

let setUpBehavior = function () {

    let graph = $("#graph");
    let outGraph = $(".outGraph");
    let graphCourses = $(".inGraph");

    /*            DRAGGABLE BEHAVIOR           */
    outGraph.draggable({revert: true});
    jsPlumbInstance.draggable(graphCourses, { containment: "parent" });

    /*           GRAPH DROPPABLE BEHAVIOR             */
    graph.droppable({
        accept: ".draggable",
        drop: function (e, ui) {
            addCourseToProfile(Profile, ui.helper.attr('id'),
                event.clientX-displacementX,
                event.clientY-displacementY);

            let ViewModel = makeViewModel(Profile);
            refreshView(ViewModel);
        }
    });

    $(document).ready(function () {
        let courses = $(".draggable");
        courses.bind("click", function () {
            focus = $(this);
        });

        $(window).click(function(event){
            if (event.target.className === "year"){
                $("#welcomeText").css("display","block");
                $("#name").css("display","none");
                $("#courseDescription").css("display","none");
                $("#prereq").css("display","none");
            }
            focus = null;
        });


        $("#delete").on('click',function(){
            if (focus !== null) {
                console.log("-------->  DELETING A CLASS");
                removeCourseFromProfile(Profile, focus.attr('id'));
                console.log("Here is the new profile AFTER DELETION");
                console.log(Profile);

                let ViewModel = makeViewModel(Profile);
                console.log(ViewModel);

                refreshView(ViewModel);
                focus = null;
            }
        });

        $("#switchComp").on('click',function(){
            $("#svgNotTaken").css("display","none");
            $("#mathNotTaken").css("display", "block");
        });

        $("#markTaken").on('click',function(){
            console.log("MarkTaken button fired");
            markasTaken(Profile, focus.attr('id'));
            console.log("Here is the new profile AFTER markasTaken");
            console.log(Profile);

            let ViewModel = makeViewModel(Profile);
            console.log(ViewModel);

            refreshView(ViewModel);
        });

        $("#markPlanned").on('click',function(){
            console.log("MarkPlanned button fired");
            markasPlanned(Profile, focus.attr('id'));
            console.log("Here is the new profile AFTER markasPlanned");
            console.log(Profile);
            let ViewModel = makeViewModel(Profile);
            console.log(ViewModel);

            refreshView(ViewModel)
        });
    });

};


let refreshView = function (ViewModel) {
console.log("-----------> refreshView")
    jsPlumbInstance.reset();

    for (let prereq of ViewModel.Classes) {
        if (prereq.status === "planned") {
            let element = document.getElementById(prereq.course);
            if (element != null) {
                element.parentNode.removeChild(element);
            }
        }
    }

    draw(ViewModel);
    drawConnections(ViewModel.Connections);

    let graphCourses = $(".inGraph");
    let outGraph = $(".outGraph");

    outGraph.draggable({revert: true});
    jsPlumbInstance.draggable(graphCourses, {
        disabled: true,
        containment: "parent"
    });

    graphCourses.mousedown(function(event){
        for (let course of Profile){
            if ($(this).attr('id') === course.course){
console.log("----> mousedown click at", event.clientX, event.clientY, "course at", course.x, course.y);
                displacementX = event.clientX - course.x;
                displacementY = event.clientY - course.y;
            }
        }
    });

    graphCourses.mouseup(function(event){
        focus = $(this);
        for (let course of Profile){
            if ($(this).attr('id') === course.course){
                course.x = event.clientX-displacementX;
                course.y = event.clientY-displacementY;
console.log("----> mouseup   click at", event.clientX, event.clientY, "course at", course.x, course.y);
            }
        }
        let ViewModel = makeViewModel(Profile);
        refreshView(ViewModel);
    });

    jsPlumb.fire("jsPlumbDemoLoaded", jsPlumbInstance);
};

let drawConnections = function (Connections) {
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
};

export {drawConnections, refreshView, jsPlumbInstance, setUpBehavior, Profile}