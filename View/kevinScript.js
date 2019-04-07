
let viewModel, courseCatalog, connections;

d3.json("./ViewModel_Test.json").then(function (data) {
    viewModel = data;
    connections = data.Connections;
});


jsPlumb.ready(function () {

    var instance = jsPlumb.getInstance({
        Connector: ["Straight"],
        DragOptions: {cursor: "pointer", zIndex: 5},
        PaintStyle: {stroke: "black", strokeWidth: 2},
    });
    var draggableNotTaken = jsPlumb.getSelector("#svgNotTaken .draggable");
    var draggableGraph = jsPlumb.getSelector("#graph .draggable");
    instance.draggable(draggableNotTaken);
    instance.draggable(draggableGraph);

        function initializeConnections(){
        for (let connection of connections){
            instance.connect({
                source: connection.source,
                target: connection.target,
                endpoint:"Blank",
                anchors:[
                    [ "Perimeter", { shape:"Diamond", anchorCount:150  } ],
                    [ "Perimeter", { shape:"Diamond", anchorCount:150  } ]
                ]
            })
        }
    }

    initializeConnections();

    jsPlumb.fire("jsPlumbDemoLoaded", instance);





});