$(document).ready(function() {
    var courseCatalog;
    d3.json("../Model/CS_major.json").then(function(data){
        courseCatalog = data;
    });

    $(this).click(function(){
        console.log(this);
    });

    var graph = $("#graph");
    var threshold = "50%";

    Draggable.create("g",{
        onRelease: function() {
            if (this.hitTest(graph, threshold)) {
                console.log(graph);
                //graph.append(this.target);
                //updateGraph();
            }
        },
        onPress: function() {
            console.log(this);
            //var course = findCourse(courseCatalog,this);
            //var description = course.courseInfo;
            //$("#courseDescription").replaceWith( "<p id='courseDescription'>" + description + "</p>" );
        }
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
