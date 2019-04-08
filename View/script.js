$(document).ready(function() {
    var courseCatalog;
    d3.json("../Model/CS_major.json").then(function(data){
        courseCatalog = data;
    });

    $(function () {

        //Make element draggable
        $(".draggable").draggable({
            helper: 'clone',
            cursor: 'move',
            tolerance: 'fit',
            revert: true
        });
        $("#graph").droppable({
            accept: '.draggable',
            drop: function (e, ui) {
                var x = ui.helper.clone();
                ui.helper.remove();
                $(x).removeAttr("class");

                $(x).addClass("dropItem");
                x.addClass('jsPlumbItem');
                x.appendTo('#DropArea');

                AddLine();
            }
        });
    });
    //
    // function AddLine()
    // {
    //     jsPlumb.removeAllEndpoints();
    //     var j = 1;
    //     var previous;
    //
    //     $("#DropArea").find(".jsPlumbItem").each(function () {
    //
    //         if (j > 1)
    //         {
    //             var e0 = jsPlumb.addEndpoint(previous);
    //             var e1 = jsPlumb.addEndpoint($(this));
    //             //add line
    //             jsPlumb.connect({ source: e0, target: e1 });
    //         }
    //         else
    //         {
    //             j++;
    //         }
    //         previous = $(this);
    //     });
    //     jsPlumb.draggable($(".jsPlumbItem"));
    //
    // }

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

    function hitTest(object,bounds){
        var course = object.getBoundingClientRect();
        var graph = bounds.getBoundingClientRect();
        var center = {
            x: (course.left+course.right)/2,
            y: (course.top+course.bottom)/2
        };
        if (graph.left < center.x && center.x < graph.right){
            if (graph.top < center.y && center.y < graph.bottom ){
                alert("Hit Test! \n Object " + object + " collided with " + bounds)
            }
        }
    }


    function findCourse(data,course) {
        let ID = course.id;
        for (let object of data) {
            if ((object.dept + object.courseNum) === ID){
                return object;
            }
    }
    }

});
