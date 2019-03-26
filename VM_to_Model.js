//Approach to taking view model and outputting model

d3.json("./ViewModel_Test.json").then(function(data){
    draw(data);
});

function draw(ViewModel) {

    const radius = 35;

    let Classes = ViewModel.Classes;
    //let Connections = ViewModel.Connections;
    let svgContainer = d3.select("body")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 1000);

    let circles = [];
    for (let object of Classes) {
        circles.push(
            {
                x: Math.round(Math.random() * 100 + 40),
                y: Math.round(Math.random() * 100 + 40),
                dept: object.dept,
                course: object.course,
            }
        )
    }


    let container = svgContainer.selectAll("g")
        .data(circles)
        .enter().append("g")
        .attr("id", "draggable")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    container.append("circle")
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", radius)
        .style("fill", "green");

    container.append("text")
        .attr("x", function (d) {
            return d.x + 9
        })
        .attr("y", function (d) {
            return d.y + 9
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .attr("fill", "black")
        .text(function (d) {
            return d.dept + d.course;
        });

    function dragstarted(d) {
        d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
        d3.select(this).select("text")
            .attr("x", d.x = d3.event.x)
            .attr("y", d.y = d3.event.y);
        d3.select(this).select("circle")
            .attr("cx", d.x = d3.event.x)
            .attr("cy", d.y = d3.event.y);
    }

    function dragended(d) {
        d3.select(this).classed("active", false);
    }

}