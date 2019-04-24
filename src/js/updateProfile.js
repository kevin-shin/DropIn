let data1 = [1,2,3,4,5,6];

$("#upgrade").on("click", upgrade);
$("#downgrade").on("click", downgrade);


function upgrade() {
    data1.push(1);
    data1.push(3);
    update();
}

function downgrade(){
    data1.pop();
    data1.pop();
    update()
}


function update() {
    let selection = d3.select("#container")
        .selectAll(".example").data(data1)
        .style("height", function(d){ return d*20 + "px";})
        .style("width",function(d) {return d*20 + "px"});

    selection.enter()
        .append("div").attr("class", "example")
        .style("height", function(d){ return d*20 + "px";})
        .style("width",function(d) {return d*20 + "px"});

    selection.exit().remove();
}


update()