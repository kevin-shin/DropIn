//Approach to taking view model and outputting model
let ViewModel;

d3.json("./ViewModel_Test.json").then(function (data) {
    draw(data);
    ViewModel = data;
});

function draw(ViewModel) {

    const radius = 20;
    const displacement = radius + 20;

    let Classes = ViewModel.Classes;
    let taken = Classes.filter(course => course.taken === true);
    let requiredNotTaken = Classes.filter(course => (course.taken === false && course.required === true));
    let available = Classes.filter(course => (course.taken === false && course.required === false));

    /*
    NOT TAKEN COURSES
    Color: Red
     */

    let svg = d3.select("body")
        .select("#GUI")
        .append("div")
        .attr("id","svgNotTaken");

    let svgGroups = svg.selectAll("notTaken")
        .data(available)
        .enter().append("div")
        .attr("id", function (d) {
            return String(d.dept) + String(d.course)
        })
        .html(function(d) {
            return String(d.course)
        })
        .classed("draggable available", true);

    /*
    TAKEN COURSES
    Color: Green
     */
    let svgNotTakenDivs = d3.select("body")
        .select("#GUI")
        .append("div")
        .attr("id","graph");

    let svgContainer = svgNotTakenDivs.selectAll("taken")
        .data(taken)
        .enter().append("div")
        .attr("id", function (d) {
            return String(d.dept) + String(d.course)
        })
        .html(function(d) {
                return String(d.course)
            })
        .attr("class","draggable taken");

    /*
    REQUIRED, NOT TAKEN COURSES
    Color: Gray
     */
    let svgRequiredGroups = svgNotTakenDivs.selectAll("taken")
        .data(requiredNotTaken)
        .enter().append("div")
        .attr("id", function (d) {
            return String(d.dept) + String(d.course)
        })
        .html(function(d) {
            return String(d.course)
        })
        .attr("class","draggable required");


    let defs = svgNotTakenDivs.append('defs');
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
    let paths = svgNotTakenDivs.selectAll("edge")
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
}

/*Eventually, the proper way to do this would be all data-manipulation,
and letting CSS draw the colors for you. Right now, it's fine to manipulate
the attribute color, but later you should just change classes, so that CSS
says "All classes that have class = "taken" are green" as a rule.
*/

function placeNode(object) {
    if (object.taken === false && object.required === false) {
        return {cx: 50, cy: 50}
    } else {
        if (object.course < 300) {
            return {cx: 100, cy: 100}
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


function dragstarted(d) {
    //d3.select(this).raise().classed("active", true);
}

function dragged(d) {
}

function dragended(d) {

}

