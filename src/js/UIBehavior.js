import {catalogue} from "../Model/cs_major.js";
import {Profile, draw} from "./VMtoView.js";
import {addCourseToProfile, removeCourseFromProfile, markasTaken, markasPlanned, fillPrereqs} from "./profileManipulation.js";
import {makeViewModel} from "./makeViewModel.js";

let focus;

let displacementX;
let displacementY;
let radius = 30;
let align = radius + 7;

let jsPlumbInstance = jsPlumb.getInstance({
    Connector: ["Straight"],
    DragOptions: {cursor: "pointer", zIndex: 5},
    PaintStyle: {stroke: "black", strokeWidth: 1}
});

jsPlumb.Defaults.MaxConnections = 10;

/* Initialize draggable, droppable, and mouse behavior. Associate functions with buttons. */
let setUpBehavior = function () {
    let graph = $("#graph");
    let outGraph = $(".outGraph");
    let graphCourses = $(".inGraph");

    outGraph.draggable({revert: true});

    outGraph.mouseenter(function(){
        $(this).css("z-index","1000");
    });

    outGraph.mouseleave(function(){
        $(this).css("z-index","999");
    });

    jsPlumbInstance.draggable(graphCourses, {containment: "parent"});

    graph.droppable({
        accept: ".draggable",
        drop: function (e, ui) {
            addCourseToProfile(Profile, ui.helper.attr('id'),
                event.clientX - ($("#graph").offset().left + radius),
                event.clientY - ($("#graph").offset().top + radius));
            let ViewModel = makeViewModel(Profile);
            refreshView(ViewModel);
        }
    });

    $(document).ready(function () {
        $("#graph").click(function (event) {
            if (event.target.className === "year") {
                $("#welcomeText").css("display", "block");
                $("#name").css("display", "none");
                $("#courseDescription").css("display", "none");
                $("#prereq").css("display", "none");
                $("#legend").css("display","block")
            }
            focus = null;
            console.log("I'm clicking on:" + event.clientX + ", " + event.clientY);
        });

        $("#delete").on('click', function () {
            if (focus !== null) {
                console.log("DELETE ACTIVATE");
                console.log(focus);
                removeCourseFromProfile(Profile, focus.attr('id'));
                let ViewModel = makeViewModel(Profile);
                refreshView(ViewModel);
                focus = null;
            }
            console.log("Having deleted, focus is:");
            console.log(focus);
        });

        $("#switchComp").on('click', function () {
            $("#svgNotTaken").css("display", "block");
            $("#mathNotTaken").css("display", "none");
        });

        $("#switchMath").on('click', function () {
            $("#svgNotTaken").css("display", "none");
            $("#mathNotTaken").css("display", "block");
        });

        $("#markTaken").on('click', function () {
            console.log("Mark Taken triggered");
            console.log("Focus should be:");
            console.log(focus);
            markasTaken(Profile, focus.attr('id'));
            let ViewModel = makeViewModel(Profile);
            refreshView(ViewModel);
            console.log("Having marked taken, focus is:");
            console.log(focus);
        });

        $("#markPlanned").on('click', function () {
            console.log("Mark Planned triggered");
            console.log("Focus should be:");
            console.log(focus);
            markasPlanned(Profile, focus.attr('id'));
            let ViewModel = makeViewModel(Profile);
            refreshView(ViewModel);
            console.log("Having marked planned, focus is:");
            console.log(focus);
        });

        $("#align").on('click', function () {
            alignProfile(Profile);
            let ViewModel = makeViewModel(Profile);
            refreshView(ViewModel);
        });

        $("#missingPrereq").on('click', function () {
            console.log("HEERRR");
            fillPrereqs(Profile);
            let ViewModel = makeViewModel(Profile);
            refreshView(ViewModel);
        });
    });
};


/*
refreshView takes a ViewModel and calls the appropriate draw methods. Responsible for reinstituting draggable, droppable,
and mouse behavior after the nodes are redrawn.
 */
let refreshView = function (ViewModel) {
    jsPlumbInstance.reset();

    //Prevent jsPlumb error of connecting a course before the View has been redrawn.
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

    // Reinstate appropriate UI Behaviors
    let graphCourses = $(".inGraph");
    let outGraph = $(".outGraph");

    outGraph.draggable({revert: true});
    outGraph.mouseenter(function(){
        $(this).css("z-index","1000");
    });
    outGraph.mouseleave(function(){
        $(this).css("z-index","999");
    });
    jsPlumbInstance.draggable(graphCourses, {
        disabled: true,
        containment: "parent"
    });

    graphCourses.mousedown(function (event) {
        instructionsDisplay($(this));
        for (let course of Profile) {
            if ($(this).attr('id') === course.course) {
                displacementX = event.clientX - course.x;
                displacementY = event.clientY - course.y;
            }
        }
    });

    graphCourses.mouseup(function (event) {
        for (let course of Profile) {
            if ($(this).attr('id') === course.course) {
                course.x = event.clientX - displacementX;
                course.y = event.clientY - displacementY;
            }
        }
        let ViewModel = makeViewModel(Profile);
        refreshView(ViewModel);
        focus = $(this);
    });

    outGraph.mousedown(function () {
        instructionsDisplay($(this));
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

/*
@param
selectedCourse: JQuery selection of a HTML object representing a course

Each course node is associated with a mouse event bound to this function. On click, the instructions panel populates
with information specific to that node.
 */
function instructionsDisplay(selectedCourse) {
    let course = findCourse(catalogue, selectedCourse.attr('id'));
    let prereq = course.prereq;
    let description = course.courseInfo;
    let name = course.name;
    let title = course.dept + course.courseNum;

    let prereqString = "";
    if (prereq.length > 0) {
        for (let course of prereq) {
            prereqString += course + ", ";
        }
        prereqString = prereqString.slice(0, -2);

        $("#prereq").css("display", "block").replaceWith(
            "<p id='prereq'>" + "Prerequisites: " + prereqString + "</p>"
        );
    } else {
        $("#prereq").css("display", "none")
    }

    $("#welcomeText").css("display", "none");
    $("#name").css("display", "block").replaceWith("<p id='name'>" + title + "<br>" + name + "</p>");
    $("#courseDescription").css("display", "block").replaceWith(
        "<p id='courseDescription'>" + description + "</p>"
    );
    $("#legend").css("display","none");
}

//Helper method for instructionsDisplay. Returns appropriate course object from catalog.
function findCourse(data, course) {
    for (let object of data) {
        if ((object.dept + object.courseNum) === course) {
            return object;
        }
    }
}

//Centers each course to a Year panel. Can be called by user at any point to reposition courses on graph.
function alignProfile(Profile){
    for (let course of Profile){
        if (22 < course.x+radius && course.x+radius < 134){
            course.x = 78-align;
        }
        if (134 < course.x+radius && course.x+radius < 247){
            course.x = 190-align;
        }
        if (247 < course.x+radius && course.x+radius < 359){
            course.x = 303-align;
        }
        if (359 < course.x+radius && course.x+radius < 471){
            course.x = 415 - align;
        }
        if (471 < course.x+radius && course.x+radius < 586){
            course.x = 529-align;
        }
        if (586 < course.x+radius && course.x+radius < 699){
            course.x = 643-align;
        }
        if (699 < course.x+radius && course.x+radius < 813){
            course.x = 756-align;
        }
        if (813 < course.x+radius && course.x+radius < 923){
            course.x = 868-align;
        }
    }
}

export {drawConnections, refreshView, jsPlumbInstance, setUpBehavior, Profile}