let data1 = ["",2,3,4,5,6, 7, 8, 9, 10];
let data2 = ["hello", "my", "name", "is"];

$("#upgrade").on("click", upgrade);
$("#downgrade").on("click", downgrade);


function upgrade() {
    data2.push("now");
    data2.push("push");
    update();
}

function downgrade(){
    data2.pop();
    data2.pop();
    update();
}


function update() {
    let selection = d3.select("#container").selectAll("circle").data(data2);

    selection.enter()
        .append("div").attr("class", "example")
        .html(function (d) {return d});

    selection.exit().remove();
}


update();