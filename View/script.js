$(document).ready(function(){

    var graph = $("#graph");
    var availlableCourses = $("#availableCourses");
    var threshold = "50%";

    Draggable.create(".draggable.notTaken",{
        onRelease: function() {
            if (this.hitTest(graph, threshold)) {
                console.log("Hit here!");
                graph.append(this.target);
            }
        }
    });



});