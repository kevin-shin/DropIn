$(document).ready(function () {
        $(".draggable").draggable({
            scope: 'demoBox',
            revertDuration: 100,
            start: function (event, ui) {
                //Reset
                $(".draggable").draggable("option", "revert", true);
                $('.result').html('-');
            }
        });
        $(".drag").droppable({
            scope: 'demoBox',
            drop: function (event, ui) {
                $(".draggable").draggable("option", "revert", false);
            }
        })
    }
);