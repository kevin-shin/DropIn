import {Profile} from "../Model/profile.js";
import {scope} from "./ViewConnections.js";
import {rules} from "../Model/cs_major_rules.js";
import { drawConnections } from "./ViewConnections.js";
import { ViewModel } from "../Model/ViewModel_Test.js";

let VMtoView = function () {
    //IMPORT DATA
    draw(ViewModel);
    drawConnections(ViewModel.Connections);

    function draw(ViewModel) {

        const radius = 20;

        let Classes = ViewModel.Classes;
        let taken = Classes.filter(course => course.taken === true);
        let available = Classes.filter(course => (course.taken === false && course.required === false));


        //NOT TAKEN COURSES. Color: Red
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
            .classed("draggable available outGraph", true);


        //TAKEN COURSES. Color: Green
        let svgNotTakenDivs = d3.select("body")
            .select("#GUI")
            .append("div")
            .attr("id", "graph");

        let years = ["Year 1", "Year 2", "Year 3", "Year 4"];

        let svgYears = svgNotTakenDivs.selectAll("taken")
            .data(years)
            .enter().append("div")
            .attr("class", "year")
            .html(function (d) {
                return String(d)
            });

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


        //REQUIRED, NOT TAKEN COURSES Color: Gray
        // let svgRequiredGroups = svgNotTakenDivs.selectAll("taken")
        //     .data(requiredNotTaken)
        //     .enter().append("div")
        //     .attr("id", function (d) {
        //         return String(d.dept) + String(d.course)
        //     })
        //     .html(function (d) {
        //         return String(d.course)
        //     })
        //     .attr("class", "draggable required inGraph");

        for (let label in rules) {
            let inputLabel = "#" + String(label);
            console.log(inputLabel);
            console.log(label.courses) //Returns undefined. Need to figure out how to access this list.
        }

        // for (let label in rules) {
        //     let inputLabel = "#" + String(label);
        //     var subRequirementList = d3.select(inputLabel);
        //
        //     subRequirementList.selectAll("courses")
        //         .data(label.courses)
        //         .enter().append("li")
        //         .attr("id", function (d) {
        //             return d
        //         })
        //         .append("label").text(function (d) {
        //             return d
        //         })
        //         .append("input").attr("type", "checkBox");
        // }


        //BUTTON BAR
        let buttonBar = d3.select("body")
            .select(".instructions")
            .append("div")
            .attr("id", "buttonBar");

        buttonBar.append("button")
            .attr("id", "markTaken")
            .html("Mark as Taken")
            .on("click", markTaken);

        buttonBar.append("button")
            .attr("id", "markUntaken")
            .html("Mark as Untaken")
            .on("click", markUntaken);

        positionPreReqs();
        positionTopBar();


        //-----------     HELPER FUNCTIONS     -----------

        function positionTopBar() {
            let topCourses = $(".draggable.available");
            const length = topCourses.length;
            const width = $("#svgNotTaken").width() - 75;
            const placement = width / length;
            let i = 1;
            for (let course of topCourses) {
                $(course).css({
                    top: $("#svgNotTaken").height() / 2 - (radius + 10),
                    left: i * placement - 40
                });
                i++;
            }
        }

        //TODO: THINK ABOUT THIS. Do you add and remove required? If so, how?
        //Do you want your users to have this ability? Should they?

        function markTaken() {
            scope.addClass("taken").removeClass("available")
        }

        function markUntaken() {
            scope.addClass("available").removeClass("taken")
        }

        function positionPreReqs() {
            $("#COMP123").css({
                top: 250,
                left: 30
            });
            $("#COMP127").css({
                top: 200,
                left: 130
            });
            $("#COMP128").css({
                top: 230,
                left: 280
            });
            $("#MATH279").css({
                top: 330,
                left: 280
            });
            $("#COMP240").css({
                top: 130,
                left: 510
            });
            $("#COMP221").css({
                top: 230,
                left: 510
            });
        }
    }
};


export {VMtoView}