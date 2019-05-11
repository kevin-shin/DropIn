import {catalogue} from "../Model/cs_major.js";
import {Profile, draw} from "./VMtoView.js";
import {addCourseToProfile, removeCourseFromProfile, markasTaken, markasPlanned, fillPrereqs} from "./profileManipulation.js";
import {makeViewModel} from "./makeViewModel.js";

let focus;

let displacementX;
let displacementY;
let radius = 30;
let align = radius+11;

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

    outGraph.mouseenter(function(){
        $(this).css("z-index","1000");
    });

    outGraph.mouseleave(function(){
        $(this).css("z-index","999");
    });

    outGraph.draggable({revert: true});
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
            findFocus();
        });

        $("#delete").on('click', function () {
            if (focus !== null) {
                removeCourseFromProfile(Profile, focus.attr('id'));
                let ViewModel = makeViewModel(Profile);
                refreshView(ViewModel);
                focus = null;
            }
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
            markasTaken(Profile, focus.attr('id'));
            let ViewModel = makeViewModel(Profile);
            refreshView(ViewModel);
        });

        $("#markPlanned").on('click', function () {
            markasPlanned(Profile, focus.attr('id'));
            let ViewModel = makeViewModel(Profile);
            refreshView(ViewModel);
        });

        $("#align").on('click', function () {
            alignProfile(Profile);
            let ViewModel = makeViewModel(Profile);
            refreshView(ViewModel);
        });

        $("#missingPrereq").on('click', function () {
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

    // Reinstate appropriate UI Behaviors with new drawn HTML elements
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
        focus = $(this);
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
    });

    outGraph.mousedown(function () {
        instructionsDisplay($(this));
    });

    findFocus();

    jsPlumb.fire("jsPlumbDemoLoaded", jsPlumbInstance);
};

/*
@param
Connections: An array of objects with source/target properties, representing a connection between a prereq and a course.
In the context of the drawing process, this will be the Connections property of the ViewModel.
 */
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
    let firstYear = $("#FYFall");
    let initPosition = firstYear.offset().left;
    let displacementWidth = firstYear.outerWidth();

    for (let course of Profile){
        if (initPosition < course.x+radius && course.x+radius < initPosition + 1 * displacementWidth){
            course.x = (initPosition + initPosition + 1 * displacementWidth)/2 -align;
        }
        if (initPosition + 1 * displacementWidth < course.x+radius && course.x+radius < initPosition + 2 * displacementWidth){
            course.x = ((initPosition + 1 * displacementWidth) + (initPosition + 2 * displacementWidth))/2 - align;
        }
        if (initPosition + 2 * displacementWidth < course.x+radius && course.x+radius < initPosition + 3 * displacementWidth){
            course.x = ((initPosition + 2 * displacementWidth) + (initPosition + 3 * displacementWidth))/2 -align;
        }
        if (initPosition + 3 * displacementWidth < course.x+radius && course.x+radius < initPosition + 4 * displacementWidth){
            course.x = ((initPosition + 3 * displacementWidth) + (initPosition + 4 * displacementWidth))/2 - align;
        }
        if (initPosition + 4 * displacementWidth < course.x+radius && course.x+radius < initPosition + 5 * displacementWidth){
            course.x = ((initPosition + 4 * displacementWidth) + (initPosition + 5 * displacementWidth))/2 - align;
        }
        if (initPosition + 5 * displacementWidth < course.x+radius && course.x+radius < initPosition + 6 * displacementWidth){
            course.x = ((initPosition + 5 * displacementWidth) + (initPosition + 6 * displacementWidth))/2 - align;
        }
        if (initPosition + 6 * displacementWidth < course.x+radius && course.x+radius < initPosition + 7 * displacementWidth){
            course.x = ((initPosition + 6 * displacementWidth) + (initPosition + 7 * displacementWidth))/2 - align;
        }
        if (initPosition + 7 * displacementWidth < course.x+radius && course.x+radius < initPosition + 8 * displacementWidth){
            course.x = ((initPosition + 7 * displacementWidth) + (initPosition + 8 * displacementWidth))/2 - align;
        }
    }
}

/*
Called after each refresh to find the course in focus and assign a distinguishing CSS feature.
 */
let findFocus = function(){
    let inGraph = $(".inGraph");

    for (let course of inGraph){
        let tag = "#" + course.id;
        $(tag).css({"box-shadow": "unset"});
    }

    for (let course of inGraph){
        if (typeof focus !== "undefined" && focus !== null) {
            if (course.id === focus.attr('id')) {
                let tag = "#" + course.id;
                $(tag).css({"box-shadow": "0px 0px 23px 2px rgba(153,145,130,1)"});
            }
        }
    }
};

export {drawConnections, refreshView, jsPlumbInstance, setUpBehavior, Profile}