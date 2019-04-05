$(document).ready(function(){

    var container = $("#svgNotTaken");
    var dropPanel = $("#graph");
    var tiles     = $(".draggable");
    var threshold = "50%";

    tiles.each(function() {

        var element = $(this);
        var wrapper = element.parent();
        var offset  = element.position();

        var scope = {
            clone   : element.clone().addClass("clone").prependTo(container),
            element : element,
            wrapper : wrapper,
            width   : wrapper.outerWidth(),
            dropped : false,
            moved   : false,
            get x() { return getPosition(wrapper, offset).x; },
            get y() { return getPosition(wrapper, offset).y; }
        };

        scope.draggable = createDraggable(scope);

        element.on("mousedown touchstart", scope, startDraggable);
    });

// START DRAGGABLE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    function startDraggable(event) {

        var tile = event.data;

        TweenLite.set(tile.element, { autoAlpha: 0 });
        TweenLite.set(tile.clone, { x: tile.x, y: tile.y, autoAlpha: 1 });

        tile.draggable.startDrag(event.originalEvent);
    }

// CREATE DRAGGABLE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    function createDraggable(tile) {

        var clone   = tile.clone;
        var wrapper = tile.wrapper;

        tile.draggable = new Draggable(clone, {
            onPress   : setActive,
            onRelease : dropTile
        });

        return tile.draggable;
        ///////

        function setActive() {
            TweenLite.to(clone, 0.15, { scale: 1.2, autoAlpha: 0.75 });
        }

        function dropTile() {

            var className = undefined;

            if (this.hitTest(dropPanel, threshold) && !tile.dropped) {
                dropPanel.append(wrapper);
                tile.dropped = true;
                className = "+=dropped";
            }

            moveBack(tile, className);
        }
    }

// MOVE BACK :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    function moveBack(tile, className) {

        var clone   = tile.clone;
        var element = tile.element;
        var wrapper = tile.wrapper;

        TweenLite.to(wrapper, 0.2, { width: tile.width });
        TweenLite.to(clone, 0.3, { scale: 1, autoAlpha: 1, x: tile.x, y: tile.y, onComplete: done });

        if (className) TweenLite.to([element, clone], 0.3, { className: className });

        function done() {
            tile.moved = false;
            TweenLite.set(clone, { autoAlpha: 0 });
            TweenLite.set(element, { autoAlpha: 1 });
        }
    }

// GET POSITION ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    function getPosition(wrapper, offset) {

        var position1 = wrapper.offset();
        var position2 = container.offset();

        return {
            x: position1.left - position2.left + offset.left,
            y: position1.top  - position2.top  + offset.top
        };
    }






});

