$(document).ready(function () {

    const radius = 20;
    const displacement = radius + 10;

    var courses, arrows, catalog;

    d3.json("./ViewModel_Test.json").then(function (data) {
        courses = data.Classes;
        arrows = data.Connections;
    });

    d3.json("../Model/CS_major.json").then(function (data) {
        catalog = data;
    });

    var instance = jsPlumb.getInstance({
        Connector: ["Straight"],
        DragOptions: {cursor: "pointer", zIndex: 5},
        PaintStyle: {stroke: "black", strokeWidth: 2},
    });


    var availableCourses = $(".draggable.available");
    var graphCourses = $(".inGraph");

    availableCourses.draggable({});
    instance.draggable(graphCourses);


    $("#svgNotTaken").droppable({
        accept: '.draggable',
    });

    $("#graph").droppable({
        drop: function (e, ui) {
            var x = ui.helper.clone();
            ui.helper.remove();
            x.css({top: e.clientY - displacement, left: e.clientX - displacement, position: 'absolute'});
            x.addClass("inGraph");
            $("#graph").append(x);
            availableCourses = $(".draggable.available");
            graphCourses = $(".inGraph");

            availableCourses.draggable({});
            instance.draggable(graphCourses);


        }
    });
    let sourceTarget = [
        {
            source: "COMP123",
            target: "COMP127"
        },
        {
            source: "COMP127",
            target: "COMP128"
        },
        {
            source: "COMP128",
            target: "COMP221"
        },
        {
            source: "MATH279",
            target: "COMP221"
        },
        {
            source: "COMP128",
            target: "COMP240"
        }
    ];

    function initializeConnections() {
        sourceTarget.forEach((function(entry){
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

        // for (var node in sourceTarget) {
        //     instance.connect({
        //         source: node.source,
        //         target: node.target,
        //         endpoint: "Blank",
        //         anchors: [
        //             ["Perimeter", {shape: "Diamond", anchorCount: 150}],
        //             ["Perimeter", {shape: "Diamond", anchorCount: 150}]
        //         ]
        //     })
        // }
    }


    initializeConnections();
    jsPlumb.fire("jsPlumbDemoLoaded", instance);


    $(".draggable").bind("mousedown", function () {
        var course = findCourse(catalog, this);
        var description = course.courseInfo;
        var name = course.name;
        $("#courseDescription").replaceWith("<p id='courseDescription'>" + description + "</p>");
        $("#name").replaceWith("<p id='name'>" + name + "</p>");
    });

    function findCourse(data, course) {
        let ID = course.id;
        for (let object of data) {
            if ((object.dept + object.courseNum) === ID) {
                return object;
            }
        }
    }
});

//function AddLine() {

// jsPlumb.removeAllEndpoints();
// var j = 1;
// var previous;
//
// $("#DropArea").find(".jsPlumbItem").each(function () {
//
//     if (j > 1)
//     {
//         var e0 = jsPlumb.addEndpoint(previous);
//         var e1 = jsPlumb.addEndpoint($(this));
//         //add line
//         jsPlumb.connect({ source: e0, target: e1 });
//     }
//     else
//     {
//         j++;
//     }
//     previous = $(this);
// });
// jsPlumb.draggable($(".jsPlumbItem"));

