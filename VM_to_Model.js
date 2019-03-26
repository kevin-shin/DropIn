//Approach to taking view model and outputting model
//https://bl.ocks.org/mbostock/22994cc97fefaeede0d861e6815a847e

let ViewModel =

    {Classes: [
        {
            "dept": "COMP",
            "course": 123
        },
            {
                "dept": "COMP",
                "course": 124
            }
    ],
    Connections: [
        {input: {
            "dept": "COMP",
            "course": 123 }},
        {output: {
            "dept": "COMP",
            "course": 124 }}
            ]
    };

const radius = 35;

let Classes = ViewModel.Classes;
//let Connections = ViewModel.Connections;

let svgContainer = d3.select("body")
                     .append("svg")
                     .attr("width", 500)
                     .attr("height", 500);

let circles = [];

for (let object in ViewModel.Classes) {
    circles.append(
        {
            x: Math.round(Math.random() * 10 + 40),
            y: Math.round(Math.random() * 10 + 40),
            dept: object.dept,
            course: object.course
        }
    )}



svgContainer.selectAll("circle")
    .data(circles)
    .enter().append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", radius)
    .style("fill", "green")
    .on("click", function(d) {console.log(String(d.course) + String(d.dept))});
/*
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

function dragstarted(d) {
    d3.select(this).raise().classed("active", true);
}

function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
    d3.select(this).classed("active", false);
}

*/