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
        .attr("id", "svgNotTaken");

    let svgGroups = svg.selectAll("notTaken")
        .data(available)
        .enter().append("div")
        .attr("id", function (d) {
            return String(d.dept) + String(d.course)
        })
        .html(function (d) {
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
        .attr("id", "graph");

    let svgContainer = svgNotTakenDivs.selectAll("taken")
        .data(taken)
        .enter().append("div")
        .attr("id", function (d) {
            return String(d.dept) + String(d.course)
        })
        .html(function (d) {
            return String(d.course)
        })
        .attr("class", "draggable taken inGraph");

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
        .html(function (d) {
            return String(d.course)
        })
        .attr("class", "draggable required inGraph");


    /*Eventually, the proper way to do this would be all data-manipulation,
    and letting CSS draw the colors for you. Right now, it's fine to manipulate
    the attribute color, but later you should just change classes, so that CSS
    says "All classes that have class = "taken" are green" as a rule.
    */

    positionPreReqs();
    positionTopBar();

    function placeNode(object) {
        //let numRed, num
        if (object.taken === false && object.required === false) {

        } else {
            if (object.course < 300) {
                return {cx: 100, cy: 100}
            } else if (300 < object.course && object.course < 500) {
                return {cx: 300, cy: 300}
            }
        }
    }

    function positionTopBar(){
        let topCourses = $(".draggable.available");
        const length = topCourses.length;
        const width = $("#svgNotTaken").width()-75;
        const placement = width/length;
        let i = 1;
        for (let course of topCourses){
            $(course).css({
                top: 50,
                left: i*placement - 40
            });
            i++;
        }
    }

    function positionPreReqs(){
        $("#COMP123").css({
            top: 300,
            left: 50
        });
        $("#COMP127").css({
            top: 250,
            left: 150
        });
        $("#COMP128").css({
            top: 280,
            left: 250
        });
        $("#MATH279").css({
            top: 380,
            left: 250
        });
        $("#COMP240").css({
            top: 180,
            left: 400
        });
        $("#COMP221").css({
            top: 280,
            left: 400
        });
        $("#COMP225").css({
            top: 380,
            left: 400
        });
        $("#COMP261").css({
            top: 480,
            left: 400
        });
    }
}

