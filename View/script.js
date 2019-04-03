$(document).ready(function () {

        $(".draggable").draggable({
            scope: 'demoBox',
            revertDuration: 100,
            zIndex: 9999,
            appendTo: "d",
            start: startedDrag,
            stop: stoppedDrag,
        });

        $(".drag").droppable({
            scope: 'demoBox',
            tolerance: "fit",
            drop: function (event, ui) {
                $(".draggable").draggable("option", "revert", false);
                $('.result').html("[Action] <b>" + box + "</b>" +
                    " dropped on " +
                    "<b>" + area + "</b>")
                $(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
            }
        });


        $(".drag-area").droppable({
            scope: 'demoBox',
            tolerance: "fit",
            drop: function (event, ui) {
                $(".draggable").draggable("option", "revert", false);
                $('.result').html("[Action] <b>" + box + "</b>" +
                    " dropped on " +
                    "<b>" + area + "</b>")
                $(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
            }
        });


        function startedDrag() {
            $('#availableCourses').css({
                overflow: 'visible',
            });
        }

        function stoppedDrag() {
            $('#availableCourses').css({
                overflow: 'scroll',
            });
        }
    }
);