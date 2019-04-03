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
                var area = $(this).find(".area").html();
                var box = $(ui.draggable).html();
                $(".draggable").draggable("option", "revert", false);

                //Display action in text
                $('.result').html("[Action] <b>" + box + "</b>" +
                    " dropped on " +
                    "<b>" + area + "</b>");

                //Realign item
                $(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
            }
        })
    }
);