//Approach to taking view model and outputting model

d3.json("./ViewModel_Test.json").then(function(data){
    draw(data);
});

function draw(ViewModel) {

    const radius = 20;
    const displacement = radius + 5;
    let groupInFocus;


    let Classes = ViewModel.Classes;
    let Connections = ViewModel.Connections;

    //Circles is an array that will hold objects which represent how we want our circles
    //to be positioned. Notice that dept and course properties are directly taken from
    //the objects representing the classes.
    let taken = Classes.filter(course => course.taken === true);
    let requiredNotTaken = Classes.filter(course => (course.taken === false && course.required === true));
    let available = Classes.filter(course => (course.taken === false && course.required === false));


    /*
    svgContainer.select("test")
        .enter().append("circle")
        .attr("cx", 600)
        .attr("cy", 10)
        .attr("r", radius)
        .attr("fill", "green")
        .on("click", () => groupInFocus = this);
    */

    //Make Group SVG objects, which have circles and texts. This is necessary to make
    //them respond to the same drag events.
    //Not taken courses

    let svgNotTaken = d3.select("body").select("#availableCourses")
        .append("svg")
        .classed("svgNotTaken", true);

    let containerAvailable = svgNotTaken.selectAll("notTaken")
        .data(available)
        .enter().append("g")
        .attr("id", function (d) {return String(d.dept) + String(d.course)})
        .attr("class","draggable notTaken");

    containerAvailable.append("circle")
        .data(available)
        .attr("cx", function (d) {return placeNode(d).cx;})
        .attr("cy", function (d) {return placeNode(d).cy;})
        .attr("r", radius)
        .attr("fill", "red");

    containerAvailable.append("text")
        .data(available)
        .attr("x", function (d) {return placeNode(d).cx - displacement})
        .attr("y", function (d) {return placeNode(d).cy + 20})
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .attr("fill", "black")
        .text(function (d) {
            return d.dept + d.course;
        });

    let svgTaken = d3.select("body").select("#graph")
        .append("svg")
        .classed("svgTaken", true);

    let container = svgTaken.selectAll("Available")
        .data(taken)
        .enter().append("g")
        .attr("id", function (d) {return String(d.dept) + String(d.course)})
        .attr("class","draggable");

    container.append("circle")
        .data(taken)
        .attr("cx", function (d) {return placeNode(d).cx;})
        .attr("cy", function (d) {return placeNode(d).cy;})
        .attr("r", radius)
        .attr("fill", "green");

    container.append("text")
        .data(taken)
        .attr("x", function (d) {return placeNode(d).cx - displacement})
        .attr("y", function (d) {return placeNode(d).cy + 20})
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .attr("fill", "black")
        .text(function (d) {return d.dept + d.course;});

    let containerNotTaken = svgTaken.selectAll("Required")
        .data(requiredNotTaken)
        .enter().append("g")
        .attr("id", function (d) {return String(d.dept) + String(d.course)})
        .attr("class","draggable");

    containerNotTaken.append("circle")
        .data(requiredNotTaken)
        .attr("cx", function (d) {return placeNode(d).cx;})
        .attr("cy", function (d) {return placeNode(d).cy;})
        .attr("r", radius)
        .attr("fill", "gray");

    containerNotTaken.append("text")
        .data(requiredNotTaken)
        .attr("x", function (d) {return placeNode(d).cx - displacement})
        .attr("y", function (d) {return placeNode(d).cy + 20})
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .attr("fill", "black")
        .text(function (d) {return d.dept + d.course;});

    let defs = svgTaken.append('defs');
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

    //Edges
    let paths = svgTaken.selectAll("edge")
        .data(Connections)
        .enter().append('path')
        .attr('class', 'edgePath')
        .attr('d', function (d) {
            let sourceID = "#" + d.source;
            let targetID = "#" + d.target;
            let sourceNode = d3.selectAll(sourceID)
                .select("circle")
                .datum();
            let targetNode = d3.selectAll(targetID)
                .select("circle")
                .datum();
            return "M" + sourceNode.x + "," + sourceNode.y + " L" +
                targetNode.x + "," + targetNode.y;
        })
        .attr("stroke", "black")
        .attr("stroke-width", 4)
        .style('marker-end', 'url(#output)');

    updateGraph();

    /*Eventually, the proper way to do this would be all data-manipulation,
    and letting CSS draw the colors for you. Right now, it's fine to manipulate
    the attribute color, but later you should just change classes, so that CSS
    says "All classes that have class = "taken" are green" as a rule.
    */

    function placeNode(object) {
        if (object.taken === false && object.required === false) {
            return {cx: 50, cy: 50}
        } else {
            if (100 < object.course && object.course < 200) {
                return {cx: 100, cy: 100}
            } else if (100 < object.course && object.course < 200) {
                return {cx: 100, cy: 100}
            } else if (200 < object.course && object.course < 300) {
                return {cx: 200, cy: 200}
            } else if (300 < object.course && object.course < 500) {
                return {cx: 300, cy: 300}
            }
        }

    }

    function updateGraph() {
        paths.attr('d', function (d) {
            let sourceID = "#" + d.source;
            let targetID = "#" + d.target;
            let sourceNode = d3.selectAll(sourceID)
                .select("circle")
                .datum();
            let targetNode = d3.selectAll(targetID)
                .select("circle")
                .datum();
            return "M" + sourceNode.x + "," + sourceNode.y + " L" +
                targetNode.x + "," + targetNode.y;
        })
    }

}