import {Profile} from "../Model/profile.js";
import {scope} from "./ViewConnections.js";
import {rules} from "../Model/cs_major_rules.js";
import { drawConnections } from "./ViewConnections.js";
import { initPanel } from "./alertBox.js";
import { jsPlumbInstance } from "./ViewConnections.js";
import { makeProfile } from "./makeProfile.js";

let VMtoView = function () {

    initializePanels();

    let alert = new initPanel();
    alert.render();
    $("#nextButton").on("click", alert.next);

    $('#profileData').submit((event) => {
        event.preventDefault();
        let profileString = ($('#profileData').serializeArray());
        let profile = makeProfile(profileString);
        console.log(profile);
    });


    function initializePanels() {
        let years = ["Year 1", "Year 2", "Year 3", "Year 4"];

        let svg = d3.select("body")
            .select("#GUI")
            .append("div")
            .attr("id", "svgNotTaken");

        let svgNotTakenDivs = d3.select("body")
            .select("#GUI")
            .append("div")
            .attr("id", "graph");

        let svgYears = svgNotTakenDivs.selectAll("years")
            .data(years)
            .enter().append("div")
            .attr("class", "year")
            .html(function (d) {
                return String(d)
            });
    }
};
    function draw(ViewModel) {

        const radius = 20;

        let taken = ViewModel.Classes.filter(course => course.taken === true);
        let available = ViewModel.Classes.filter(course => (course.taken === false));

        //NOT TAKEN COURSES. Color: Red

        let svgGroups = d3.select("#svgNotTaken").selectAll("notTaken")
            .data(available)
            .enter().append("div")
            .attr("id", function (d) {
                return String(d.dept) + String(d.course)
            })
            .html(function (d) {
                return String(d.course)
            })
            .attr("class", "draggable available outGraph");

        //TAKEN COURSES. Color: Green
        let svgContainer = d3.select("#graph").selectAll("taken")
            .data(taken)
            .enter().append("div")
            .attr("id", function (d) {
                return String(d.dept) + String(d.course)
            })
            .html(function (d) {
                return String(d.course)
            })
            .attr("class", "draggable taken inGraph");

        //DAVID'S FUNCTION HERE

        for (let obj of rules) {
            let inputLabel = "#" + String(obj.label);//this is the grouping of "intro", "core", "math", or "elective"
            var subRequirementList = d3.select(".requirements").select(inputLabel);

            if (inputLabel === "#intro") {
                let label = "";
                for(let course of obj.courses){
                    label += course + " or ";
                }
                label = label.substring(0, label.length-4);//" or " = 4 chars
                console.log("Here")


                subRequirementList
                    .append("li")
                    .attr("id", "#reqIntro")
                    .text(label);
            } else {

                subRequirementList.selectAll("courses")
                    .data(obj.courses)
                    .enter().append("li")
                    .attr("id", function (d) {
                        return "req" + d
                    })
                    .append("label").text(function (d) {
                    return d
                })
            }
        }

        //
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

        buttonBar.append("button")
            .attr("id", "delete")
            .html("Delete")
            .on("click", removeNode);


        positionPreReqs();
        positionTopBar();


        //-----------     HELPER FUNCTIONS     -----------

        function removeNode() {
            let clone = scope.clone();
            jsPlumbInstance.remove(scope);
            $("#svgNotTaken").append(clone);
            //MORE HERE
            positionTopBar();

            // scope.remove();
            // let connectionList = jsPlumbInstance.getConnections();
            // for (let connection of connectionList) {
            //     if (connection.targetId === scope.attr('id')){
            //         jsPlumbInstance.detach(connection);
            //     }
            // }
        }

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
        function markTaken() { scope.addClass("taken").removeClass("available") }
        function markUntaken() { scope.addClass("available").removeClass("taken") }
        function deleteNode() {
            markUntaken();
            scope.remove();
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
                top: 190,
                left: 510
            });
            $("#COMP221").css({
                top: 300,
                left: 510
            });
        }
    };


export { VMtoView, draw }