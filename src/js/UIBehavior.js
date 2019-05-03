import {catalogue} from "../Model/cs_major.js";
import {Profile, draw} from "./VMtoView.js";
import {addCourseToProfile, removeCourseFromProfile} from "./profileManipulation.js";
import {makeViewModel} from "./makeViewModel.js";

let focus;

let jsPlumbInstance = jsPlumb.getInstance({
    Connector: ["Straight"],
    DragOptions: {cursor: "pointer", zIndex: 5},
    PaintStyle: {stroke: "black", strokeWidth: 1}
});

jsPlumb.Defaults.MaxConnections = 10;

let setUpBehavior = function () {
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

    /*           GRAPH DROPPABLE BEHAVIOR             */
    graph.droppable({
        accept: ".draggable",
        drop: function (e, ui) {

            console.log("-------->  I DROPPED A CLASS");
            addCourseToProfile(Profile, ui.helper.attr('id'),
                event.clientY - (displacement + 100),
                event.clientX - displacement - 5);

            console.log("Here is the new profile AFTER ADDITION");
            console.log(Profile);
            let ViewModel = makeViewModel(Profile);
            console.log(ViewModel);

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
                $("#buttonBar").css("display","none");
            }
        });


        $("#delete").on('click',function(){
            console.log("-------->  DELETING A CLASS");
            removeCourseFromProfile(Profile, focus.attr('id'));
            console.log("Here is the new profile AFTER DELETION");
            console.log(Profile);

            let ViewModel = makeViewModel(Profile);
            console.log(ViewModel);

            refreshView(ViewModel);

            focus = null;
        });

        $("#markTaken").on('click',function(){
            focus.addClass("taken").removeClass("available").removeClass("planned");
        });

        $("#markUntaken").on('click',function(){
            focus.addClass("planned").removeClass("taken");
        });

    });


};


let refreshView = function (ViewModel) {
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
    jsPlumbInstance.draggable(graphCourses, {
        disabled: true,
        containment: "parent"
    });

    let courses = $(".draggable");
    courses.bind("click", function () {
        focus = $(this);
        console.log("FOCUS");
        console.log(focus);
    });

    let outGraph = $(".outGraph");
    outGraph.draggable({revert: true});

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

export {drawConnections, jsPlumbInstance, setUpBehavior, Profile}