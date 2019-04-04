$(document).ready(function(){

    var svgNotTaken = $("#svgNotTaken");
    var dragGroups = svgNotTaken > $(".draggable");

    var draggables = dragGroups.each( {
            element: this,
            clone: $(this).clone().addClass("clone").prependTo(svgNotTaken),
            draggable: createDraggable(this)
        });

    function createDraggable(tile) {

        var clone   = tile.clone;
        tile.draggable = new Draggable(clone, {
            onPress   : setActive,
            onDrag    : collapseSpace,
            onRelease : dropTile
        });

        return tile.draggable;

        function setActive() {
            TweenLite.to(clone, 0.15, { scale: 1.2, autoAlpha: 0.75 });
        }

        function collapseSpace() {
            if (!tile.moved) {
                if (!this.hitTest(wrapper)) {
                    tile.moved = true;
                    TweenLite.to(wrapper, 0.3, { width: 0 });
                }
            }
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

});

