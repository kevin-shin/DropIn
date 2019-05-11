
/*
animateNode is responsible for creating the animation that is displayed in the tutorial panel.
Uses jsPlumb and TWEEN to move an exampleNode to a position, and draw a connection between that node
and another one on the graph.
 */

let animateNode = function () {
    let jsPlumbInstance = jsPlumb.getInstance({
        Connector: ["Straight"],
        DragOptions: {cursor: "pointer", zIndex: 5},
        PaintStyle: {stroke: "black", strokeWidth: 1}
    });

    jsPlumbInstance.connect({
        source: "connectSource",
        target: "connectTarget",
        endpoint: "Blank",
        anchors: [
            ["Perimeter", {shape: "Circle", anchorCount: 150}],
            ["Perimeter", {shape: "Circle", anchorCount: 150}]
        ],
        overlays: [
            ["Arrow", {location: 1}]
        ]
    });

    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    requestAnimationFrame(animate);

    let node = document.getElementById("exampleNode");
    let coords = {x: node.style.left, y: node.style.top};
    let tween = new TWEEN.Tween(coords)
        .to({x: 170, y: 130}, 3500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
            node.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
        });

    tween.delay(1000);
    tween.start();
    tween.onComplete(function () {

        let newNode = node.cloneNode(true);
        node.remove();
        newNode.setAttribute("style", "top: 62px;" +
            "left: 230px;" +
            "position: absolute");

        $("#lowerPanel").append(newNode);

        jsPlumbInstance.connect({
            source: "connectTarget",
            target: "exampleNode",
            endpoint: "Blank",
            anchors: [
                ["Perimeter", {shape: "Circle", anchorCount: 150}],
                ["Perimeter", {shape: "Circle", anchorCount: 150}]
            ],
            overlays: [
                ["Arrow", {location: 1}]
            ]
        })
    });
};

export {animateNode}