$(document).ready(function () {

    const radius = 20;
    const displacement = radius + 10;

    var courseCatalog, viewModel, connections;
    d3.json("./ViewModel_Test.json").then(function (data) {
        courseCatalog = data;
        viewModel = data;
        connections = data.Connections;
    });

    $(function () {
        var availableCourses = $(".draggable");
        availableCourses.draggable({});

        $("#svgNotTaken").droppable({
            accept: '.draggable',
        });

        $("#graph").droppable({
            drop: function (e, ui) {
                var x = ui.helper.clone();
                ui.helper.remove();
                x.css({top: e.clientY - displacement, left: e.clientX - displacement, position: 'absolute'});
                $("#graph").append(x);
                $(".draggable").draggable();

            }
        });
        //Make element draggable
        var instance = jsPlumb.getInstance({
            Connector: ["Straight"],
            DragOptions: {cursor: "pointer", zIndex: 5},
            PaintStyle: {stroke: "black", strokeWidth: 2},
        });

        function initializeConnections() {
            for (let connection of connections) {
                instance.connect({
                    source: connection.source,
                    target: connection.target,
                    endpoint: "Blank",
                    anchors: [
                        ["Perimeter", {shape: "Diamond", anchorCount: 150}],
                        ["Perimeter", {shape: "Diamond", anchorCount: 150}]
                    ]
                })
            }
        }

        $(".draggable").bind("mousedown", function () {
            var course = findCourse(courseCatalog, this);
            var description = course.courseInfo;
            var name = course.name;
            $("#courseDescription").replaceWith("<p id='courseDescription'>" + description + "</p>");
            $("#name").replaceWith("<p id='name'>" + name + "</p>");
        });


        initializeConnections();
        jsPlumb.fire("jsPlumbDemoLoaded", instance);


        function findCourse(data,course) {
            let ID = course.id;
            for (let object of data) {
                if ((object.dept + object.courseNum) === ID){
                    return object;
                }
            }
        }
    });

    function AddLine() {

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

    }
});
