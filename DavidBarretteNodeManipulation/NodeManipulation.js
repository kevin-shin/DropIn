
let arbData = [
    {"cx": 350,
    "cy": 300,
    "r": 30,
    "color": "red"},

    {"cx": 450,
    "cy": 300,
    "r": 30,
    "color": "red"}
];

d3.select("body")
    .append("svg")
    .attr("height",window.innerHeight)
    .attr("width",window.innerWidth);

var svg = d3.select("svg");

svg.selectAll("circle").data(arbData).enter()
    .append("circle")
    .attr("id",     function (d,i){return i})//Sets the ID of the circle
    .attr("cx",     function(d) {return d.cx;})
    .attr("cy",     function(d) {return d.cy;})
    .attr("r",      function(d) {return d.r;} )
    .attr("fill",   function (d) {return d.color});





/////////////////////////////////////////////////Toggle Status//////////////////////////////////////////////////////////////////////



//select the circles and on mouseout, have them be focused on
var circleInFocus = arbData[0];
d3.selectAll("circle")
    .on("click", function (d,i){/**NEEDS TO BE FIXED - double click*/
    circleInFocus = this;
    });

var button = d3.select("body").append("button")
    .text("Button");

button.on("click", function(){
    if(circleInFocus.getAttribute("fill") === "red"){
        circleInFocus.setAttribute("fill","blue")
    }
    else{
        circleInFocus.setAttribute("fill", "red")
    }
});


/////////////////////////////////////////////////Toggle Status//////////////////////////////////////////////////////////////////////










////////////////////////////////////////////////DRAGGING NODES/////////////////////////////////////////////////////////
svg.selectAll("circle").call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded));

function dragStarted(d){
    d3.select(this).raise().classed("active",true)
        .attr("stroke","black")
        .attr("stroke-width", "2");
}
function dragged(d){
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}
function dragEnded(d){
    d3.select(this).classed("active",false)
        .attr("stroke",d3.event.color);
}
////////////////////////////////////////////////DRAGGING NODES/////////////////////////////////////////////////////////