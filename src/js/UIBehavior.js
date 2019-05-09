import {catalogue} from "../Model/cs_major.js";
import {Profile, draw} from "./VMtoView.js";
import {addCourseToProfile, removeCourseFromProfile, markasTaken, markasPlanned} from "./profileManipulation.js";
import {makeViewModel} from "./makeViewModel.js";

let focus;

let displacementX;
let displacementY;
let radius = 30;

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
        $(window).click(function (event) {
            if (event.target.className === "year") {
                $("#welcomeText").css("display", "block");
                $("#name").css("display", "none");
                $("#courseDescription").css("display", "none");
                $("#prereq").css("display", "none");
            }
            focus = null;
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
            refreshView(ViewModel)
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
    let outGraph = $(".outGraph");

    outGraph.draggable({revert: true});
    jsPlumbInstance.draggable(graphCourses, {
        disabled: true,
        containment: "parent"
    });

    graphCourses.mousedown(function (event) {
        for (let course of Profile) {
            if ($(this).attr('id') === course.course) {
                displacementX = event.clientX - course.x;
                displacementY = event.clientY - course.y;
            }
        }
    });

    graphCourses.mouseup(function (event) {
        focus = $(this);
        console.log(focus);
        instructionsDisplay($(this));
        for (let course of Profile) {
            if ($(this).attr('id') === course.course) {
                course.x = event.clientX - displacementX;
                course.y = event.clientY - displacementY;
            }
        }
        let ViewModel = makeViewModel(Profile);
        refreshView(ViewModel);

    });

    outGraph.mouseup(function () {
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

function instructionsDisplay(selectedCourse) {
    console.log("INSTRUCTIONS DISPLY");
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
}

function findCourse(data, course) {
    for (let object of data) {
        if ((object.dept + object.courseNum) === course) {
            return object;
        }
    }
}


export {drawConnections, refreshView, jsPlumbInstance, setUpBehavior, Profile}