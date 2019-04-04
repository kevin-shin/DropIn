
/*
///////////////////////////////////////////////////////////////////////////////////
// DRAGGING AN ELEMENT OUTSIDE A SCROLLABLE CONTAINER
///////////////////////////////////////////////////////////////////////////////////

HOW IT WORKS...

The app starts off by creating clones for each tile using the scope listed below.
When the user clicks on a tile, startDraggable is called, which enables the
draggable instance to be dragged. When this happens, the real tile is hidden,
with the clone taking its place. Because the clone is not actually inside the
overflow container, it can be dragged anywhere. When the dragging stops, the clone
goes back to a hidden state.

SCOPE
- element: the tile element located in the #scroll-box
- wrapper: the element's parent, used to animate the space collapsing around a tile
- clone: a clone of the element that gets appended to the #clone-container
- dropped: is true when the tile is appended to the #drop-panel
- moved: is true when the tile has been dragged outside of its wrapper
- draggable: the draggable instance used by the clone
- x,y: getters that return the start position of the element
- width: the width of the wrapper

START DRAGGABLE
- moves the clone to the tile's position
- toggles the visibility between the element and clone
- starts the draggable instance by passing in the pointer event to its startDrag method

ON DRAG
- checks if the clone is outside of the wrapper using hitTest
- if true, it animates the space collapsing where the tile used to be

ON RELEASE
- checks if the clone is inside the drop panel using hitTest
- if it's inside and not already dropped, the wrapper is appended to the panel

MOVE BACK
- animates the wrapper space expanding
- animates the clone moving back to its starting position
- toggles the visibility between the clone and tile

///////////////////////////////////////////////////////////////////////////////////
*/

var container = $("#clone-container");
var scrollBox = $("#scroll-box");
var dropPanel = $("#drop-panel");
var tiles     = $(".tile");
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
        onDrag    : collapseSpace,
        onRelease : dropTile
    });

    return tile.draggable;
    ///////

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



var targets = $(".target");
var overlapThreshold = "50%";

// go through all the draggable objects and store their starting positions
// so can return to them when dragged off the targets

var boxes = $(".box");
$.each(boxes, function(i,e)
{
    var position = $(e).offset();
    e.originalLeft = position.left - 8;
    e.originalTop = position.top - 8;
});

Draggable.create(".box", {
    bounds:"#demo",
    edgeResistance:0.65,
    type:"x,y",
    throwProps:true,
    onDragStart:function(e) {

    },


    // changes the colour of the targets whilst dragging to give feedback that a
    // dragged object is going to snap to it
    onDrag:function(e) {
        for(var i=0; i<targets.length;i++){
            if (this.hitTest(targets[i], overlapThreshold)) {
                $(targets[i]).addClass("showOver");
            } else {
                $(targets[i]).removeClass("showOver");
            }
        }
    },

    onDragEnd:function(e) {
        var snapMade = false;
        for(var i=0; i<targets.length;i++){
            if(this.hitTest(targets[i], overlapThreshold)){

                // only snap to an available target, i.e.
                // one without a class of "occupied"
                if(!$(targets[i]).hasClass("occupied")){

                    // get the position of the target so can move
                    // dragging item exactly on it when released
                    var p = $(targets[i]).position();

                    // add a class of occupied to target to stop other items
                    // being snapped to it
                    $(targets[i]).addClass("occupied");

                    // tween onto target
                    TweenLite.to(e.target,0.1, {left:p.left, top:p.top, x:0, y:0});

                    // is a property called targetAttachedTo directly on the dragged item.
                    // this stores the target we have snapped to.  Allows us to free up
                    // the target if we drag it off it

                    // before we update that property first checks that we haven't dragged
                    // from one target straight to another as this would balls it up
                    if(e.target.targetAttachedTo!=$(targets[i]) && e.target.targetAttachedTo!=undefined){
                        e.target.targetAttachedTo.removeClass("occupied"); e.target.targetAttachedTo = undefined;
                    }

                    // now store new target in targetAttachedTo property
                    e.target.targetAttachedTo = $(targets[i]);
                    snapMade = true;
                }

            }
        }

        // if the dragged item isn't over a target send it back to its
        // start position
        if(!snapMade){
            if(e.target.targetAttachedTo != undefined){
                e.target.targetAttachedTo.removeClass("occupied");
            };
            TweenLite.to(e.target,0.1, {x:0, y:0, top:e.target.originalTop, left:e.target.originalLeft});
        }
    }
})






