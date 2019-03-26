
let arbData = [
    {"cx": 350,
    "cy": 300,
    "r": 30,
    "color": "red"},

    {"cx": 450,
    "cy": 300,
    "r": 30,
    "color": "darkred"}
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
/**
 * Fixes Needed  -----  ~5 rows down mouseup not mouseout
 *
 */

//select the circles and on mouseout, have them be focused on
// FUNTION: setFocus
var circleInFocus = arbData[0];

d3.selectAll("circle")
    .on("mouseout", function (d,i){/**NEEDS TO BE FIXED*/
    circleInFocus = this;
    console.log(circleInFocus);//TEST
    ;});


//When the button to toggle is clicked, change the color        FUNCTION: toggleTaken
// of the focus circle (above)
d3.select("#toggleColorButton").on("click", function (d,i){
    console.log("toggleTakenTest complete");
});

function toggleTaken(d){
    // if (d != null) {
    //     if (d.getAttribute("fill") === "red" ||
    //          d.getAttribute("fill") === "darkred") {
    //         d3.select(d.id).setAttribute("fill", "blue"); /** NEED AN ID FOR EACH CLASS */
    //     } else {
    //         d3.select(d.id).setAttribute("fill", "red");
    //     }
    //     console.log(d.id);
    // }
    console.log("I got it")
}


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