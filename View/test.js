jsPlumb.ready(function () {
    jsPlumb.setContainer("container");
    var link = jsPlumb.getInstance();
    link.connect({
        source: "w1",
        target: "w2",
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
    link.connect({
        source: "w2",
        target: "w3",
        anchors: [
            [1, 0.2, 0, -1],
            [0, 0.4, 0, -1]
        ],
        endpoint: "Blank",
        overlays: [
            ["Arrow", {
                location: 1,
                width: 10,
                length: 10
            }]
        ],
        paintstyle: {
            lineWidth: 2,
            strokeStyle: 'red',
            // dashstyle:" 0 1"
        },
        connector: ["Bezier", {
            curviness: 50
        }]
    });
    link.connect({
        source: "w2",
        target: "w3",
        anchors: [
            [1, 0.8, 0, 1],
            [0, 0.6, 0, 1]
        ],
        endpoint: "Blank",
        overlays: [
            ["Arrow", {
                location: 1,
                width: 10,
                length: 10
            }]
        ],
        paintstyle: {
            lineWidth: 2,
            strokeStyle: 'blue',
        },
        connector: ["Bezier", {
            curviness: 80
        }]
    });
    link.addEndpoint("w2", {
        anchor: [1, 0],
        endpoint: "Blank",
        overlays: [
            ["Label", {
                label: "foo",
                location: [7, 0]
            }]
        ]
    });
    link.connect({
        source: "w3",
        target: "w1",
        anchors: ["Bottom", "Bottom"],
        endpoint: "Blank",
        overlays: [
            ["Arrow", {
                location: 1,
                width: 10,
                length: 10
            }],
            ["Label", {
                label: "foo",
                location: 0.5,
                cssClass: "myLabel"
            }]
        ],
        paintstyle: {
            lineWidth: 1,
            strokeStyle: 'black',
        },
        connector: ["Flowchart", {
            gap: [5, 15],
            cornerRadius: 5
        }]
    });
    link.draggable(["w1", "w2", "w3"]);
    link.draggable(document.querySelectorAll(".jtk-overlay"))
});