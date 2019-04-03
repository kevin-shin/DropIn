$(document).ready(function() {

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
            drop: function (event, ui) {
                $(".draggable").draggable("option", "revert", false);
                $('.result').html("[Action] <b>" + box + "</b>" +
                    " dropped on " +
                    "<b>" + area + "</b>")
            }
        });

        function startedDrag() {
            $(".draggable").draggable("option", "revert", true);
            $('#availableCourses').css({
                overflow: 'visible',
            });
        }

        function stoppedDrag() {
            $('#availableCourses').css({
                overflow: 'scroll',
            });
            $(".draggable").draggable("option", "revert", false);
        }
    }
);