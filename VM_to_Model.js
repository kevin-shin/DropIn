//Approach to taking view model and outputting model

d3.json("./ViewModel_Test.json").then(function(data){
    draw(data);
});

function draw(ViewModel) {

    const radius = 35;

    let Classes = ViewModel.Classes;
    let Connections = ViewModel.Connections;
    let svgContainer = d3.select("body")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 1000);

    //Circles is an array that will hold objects which represent how we want our circles
    //to be positioned. Notice that dept and course properties are directly taken from
    //the objects representing the classes.
    let circles = [];
    let arrows = [];

    for (let object of Classes) {
        circles.push(
            {
                x: Math.round(Math.random() * 100 + 40),
                y: Math.round(Math.random() * 100 + 40),
                dept: object.dept,
                course: object.course
            }
        )
    }


    //Make Group SVG objects, which have circles and texts. This is necessary to make
    //them respond to the same drag events.
    let container = svgContainer.selectAll("g")
        .data(circles)
        .enter().append("g")
        .attr("id", function(d) {return String(d.dept) + String(d.course)})
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

    let defs = svgContainer.append('defs');
    defs.append('marker')
        .attr('id', 'input')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', "32")
        .attr('markerWidth', 3.5)
        .attr('markerHeight', 3.5)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5');

    // define arrow markers for leading arrow
    defs.append('marker')
        .attr('id', 'output')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 7)
        .attr('markerWidth', 3.5)
        .attr('markerHeight', 3.5)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5');

    let paths = svgContainer.selectAll("edge")
        .data(Connections)
        .enter().append('path')
        .attr('class', 'edgePath')
        .attr('d', function(d) {
            let sourceID = d.source;
            let targetID = d.target;
            let sourceNode = d3.select("#" + sourceID);
            let targetNode = d3.select("#" + targetID);
            return "M" + sourceNode.cx + "," + sourceNode.cy + " L" +
                targetNode.cx + "," + targetNode.cy;})
        .attr("stroke", "black")
        .attr("stroke-width", 4)
        .style('marker-end', 'url(#output)');

    function updateGraph(){
        paths.attr('d', function(d) {
            return "M" + d.input.x + "," + d.input.y + "L" + d.output.x + "," + d.output.y;})
    }

    function dragstarted(d) {
        d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
        d3.select(this).select("circle")
            .attr("cx", d.x = d3.event.x)
            .attr("cy", d.y = d3.event.y);
        d3.select(this).select("text")
            .attr("x", d.x = d3.event.x)
            .attr("y", d.y = d3.event.y);
        updateGraph();
    }

    function dragended(d) {
        d3.select(this).classed("active", false);
    }

}