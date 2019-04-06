$(document).ready(function() {
    var courseCatalog;
    d3.json("../Model/CS_major.json").then(function(data){
        courseCatalog = data;
    });

    var graph = $("#graph");
    var threshold = "50%";

    Draggable.create(".draggable",{
        onRelease: function() {
            console.log(this.target);
            console.log(this.target.id);
            console.log(this.target.tagName);
            console.log(this.target.class);
            if (this.target === " draggable available" && this.hitTest(graph, threshold)) {
                console.log("hit here");
            }
        },
        onPress: function() {
            var course = findCourse(courseCatalog,this);
            var description = course.courseInfo;
            var name = course.name;
            $("#courseDescription").replaceWith( "<p id='courseDescription'>" + description + "</p>" );
            $("#name").replaceWith( "<p id='name'>" + name + "</p>" );
        },
    });

    function findCourse(data,course) {
        let ID = course.target.id;
        for (let object of data) {
            if ((object.dept + object.courseNum) === ID){
                return object;
            }

    }
    }

});
