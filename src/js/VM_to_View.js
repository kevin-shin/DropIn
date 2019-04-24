import {scope} from "./ViewConnections.js";
import {rules} from "../Model/cs_major_rules.js";
import {initPanel} from "./alertBox.js";
import {jsPlumbInstance} from "./ViewConnections.js";
import {makeProfile} from "./makeProfile.js";
import {writeSourceTarget} from "./model_to_vm.js";
import {writeVM} from "./model_to_vm.js";
import {cleanCatalogue} from "./makeViewModel.js";

let exampleProfile;
let Connections;
let ViewModel;

let VMtoView = function () {

    initializePanels();
    let alert = new initPanel();
    alert.render();
    $("#nextButton").on("click", alert.next);

    $('#profileData').submit((event) => {
        event.preventDefault();
        let profileString = ($('#profileData').serializeArray());
        console.log("Profile String");
        console.log(profileString);
        exampleProfile = makeProfile(profileString);
        Connections = writeSourceTarget(exampleProfile);
        console.log("exampleProfile");
        console.log(exampleProfile);

        ViewModel = writeVM(exampleProfile,Connections);
        console.log(ViewModel);
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

    //Decrementing requirement numbers

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
        .html("Delete");

};

function draw(available, graphCourses) {

    console.log("taken");
    console.log(graphCourses);
    console.log("available");
    console.log(available);

    //NOT TAKEN COURSES. Color: Red
    let svgGroups = d3.select("#svgNotTaken").selectAll("notTaken")
        .data(available)
        .enter().append("div")
        .attr("id", function (d) {
            return d
        })
        .html(function (d) {
            return d
        })
        .attr("class", "draggable available outGraph");

    //TAKEN COURSES. Color: Green
    let svgContainer = d3.select("#graph").selectAll("taken")
        .data(graphCourses)
        .enter().append("div")
        .attr("id", function (d) {
            return d.course
        })
        .html(function (d) {
            return d.course
        })
        .attr("class", "draggable taken inGraph");

    svgGroups.exit().remove();
    svgContainer.exit().remove();

    positionPreReqs();
    positionTopBar();
    requirementsPanelUpdate();
}

let requirementsPanelUpdate = function () {
    for (let obj of rules) {
        let inputLabel = "#" + String(obj.label);//this is the grouping of "intro", "core", "math", or "elective"
        var subRequirementList = d3.select(".requirements").select(inputLabel);

        if (inputLabel === "#intro") {
            //Add the counter to the
            d3.select("#introLabel").text("Intro Classes : " + obj.required);

            //Add li to the ul
            let label = "";
            for (let course of obj.courses) {
                label += course + " or ";
            }
            label = label.substring(0, label.length - 4);//" or " = 4 chars

            subRequirementList
                .append("li")
                .attr("id", "#reqIntro")
                .text(label);

        } else {
            let temp = obj.label.charAt(0).toUpperCase();//Making the first character capital
            d3.select("#" + obj.label + "Label").text(temp + obj.label.substring(1, obj.label.length) + " Courses: \t\t" + obj.required);

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
};

//-----------     HELPER FUNCTIONS     -----------
function positionTopBar() {
    const radius = 20;
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

let notTaken = function (profile) {
    let toReturn = [];
    let compCat = cleanCatalogue();
    for (let course of compCat){
        if (!profile.some((thing) => thing.course === course)){
            toReturn.push(course);
        }
    }
    return toReturn;
};


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
        top: 190,
        left: 510
    });
    $("#COMP221").css({
        top: 300,
        left: 510
    });
    $("#COMP225").css({
        top: 150,
        left: 510
    });
};


export {VMtoView, draw, ViewModel, exampleProfile, notTaken};