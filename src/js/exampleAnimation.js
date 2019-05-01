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
    var coords = {x: node.style.left, y: node.style.top}; // Start at (0, 0)
    var tween = new TWEEN.Tween(coords)
        .to({x: 170, y: 145}, 3000)
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function () { // Called after tween.js updates 'coords'.
            // Move 'box' to the position described by 'coords' with a CSS translation.
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