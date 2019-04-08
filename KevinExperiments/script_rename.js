$(document).ready(function() {

    var courseCatalog;
    d3.json("../Model/CS_major.json").then(function(data){
        courseCatalog = data;
    });

    $(function () {
        // //Make element draggable
        $(".draggable").draggable({
            helper: 'clone',
            cursor: 'move',
            tolerance: 'fit',
            revert: "invalid"
        });
        $("#graph").droppable({
            accept: '.draggable',
            drop: function (e, ui) {
                var x = ui.helper.clone();
                ui.helper.remove();
                $("#graph").append(ui.draggable);
            }
        });

    });

    function AddLine()
    {

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

    //
    // $(".draggable").bind( "mousedown",function() {
    //     var course = findCourse(courseCatalog,this);
    //     var description = course.courseInfo;
    //     var name = course.name;
    //     $("#courseDescription").replaceWith( "<p id='courseDescription'>" + description + "</p>" );
    //     $("#name").replaceWith( "<p id='name'>" + name + "</p>" );
    // })
    //
    // $(".draggable").bind( "mouseup",function() {
    //         if (hitTest(this,graph)){
    //             alert("hittest!")
    //         }
    // });
});
