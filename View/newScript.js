jsPlumb.ready(function(){
    jsPlumb.setContainer($("graph"));
    var link = jsPlumb.getInstance();
    link.connect({
        source: "COMP123",
        target: "COMP127",
        anchors: ["Right", "Left"],
        endpoint: "Blank",
        overlays: [
            ["Arrow", {
                location: 1,
                width: 10,
                length: 10
            }],
        ],
        paintstyle: {
            lineWidth: 1,
            strokeStyle: 'black',
        },
        connector: ["Straight"]
    });
    link.draggable(["COMP","COMP127"]);
    //link.draggable( document.querySelectorAll(".jtk-overlay") )
});