$(document).ready(function(){

    var graph = $("#graph");
    var availlableCourses = $("#availableCourses");
    var threshold = "50%";

    Draggable.create(".draggable",{
        onRelease: function() {
            if (this.hitTest(graph, threshold)) {
                console.log(graph);
                graph.append(this.target);
            }
        }
    });



});