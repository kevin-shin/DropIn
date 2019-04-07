$(document).ready(function() {
    var courseCatalog;
    d3.json("../Model/CS_major.json").then(function(data){
        courseCatalog = data;
    });

    const graph = $("#graph");

    $(".draggable").bind( "mousedown",function() {
        var course = findCourse(courseCatalog,this);
        var description = course.courseInfo;
        var name = course.name;
        $("#courseDescription").replaceWith( "<p id='courseDescription'>" + description + "</p>" );
        $("#name").replaceWith( "<p id='name'>" + name + "</p>" );
    })

    $(".draggable").bind( "mouseup",function() {
            if (hitTest(this,graph)){
                alert("hittest!")
            }
    });

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
