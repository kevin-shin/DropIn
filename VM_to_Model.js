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
    )}


let container = svgContainer.selectAll("g")
                                .data(circles)
                                .enter().append("g")
                                .attr("id", "draggable")
                                .call(d3.drag()
                                        .on("start", dragstarted)
                                        .on("drag", dragged)
                                        .on("end", dragended));

container.append("circle")
    .attr("cx", function (d) {return d.x;})
    .attr("cy", function (d) {return d.y;})
    .attr("r", radius)
    .style("fill", "green")

container.append("text")
    .attr("x", function (d) {return d.x + 9})
    .attr("y", function (d) {return d.y + 9})
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", "black")
    .text(function (d) { return d.dept + d.course;});


/*
let text = svgContainer.selectAll("circle")
    .data(circles)
    .enter().append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", radius)
    .style("fill", "green")
    .on("click", function(d) {console.log(String(d.course) + String(d.dept))});
*/

/*
let courseLabels = svgContainer.selectAll("text")
                        .data(circles)
                        .enter()
                        .append("text");

var textLabels = text
                 .attr("x", function(d) { return d.cx; })
                 .attr("y", function(d) { return d.cy; })
                 .text( function (d) { return d.dept + d.course; })
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "20px")
                 .attr("fill", "red");

*/

/*
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
*/
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

