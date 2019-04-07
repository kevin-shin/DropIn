$(document).ready(function() {
    var courseCatalog;
    d3.json("../Model/CS_major.json").then(function(data){
        courseCatalog = data;
    });

    $(".draggable").bind( "mousedown",function() {
        console.log($(this).id);
        var course = findCourse(courseCatalog,this);
        var description = course.courseInfo;
        var name = course.name;
        $("#courseDescription").replaceWith( "<p id='courseDescription'>" + description + "</p>" );
        $("#name").replaceWith( "<p id='name'>" + name + "</p>" );
    });

    function findCourse(data,course) {
        let ID = course.id;
        for (let object of data) {
            if ((object.dept + object.courseNum) === ID){
                return object;
            }
    }
    }

});
