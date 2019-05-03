import {rules} from "../Model/cs_major_rules.js";
import {WelcomePanel} from "./WelcomePanel.js";
import {makeProfile} from "./profileManipulation.js";
import {makeViewModel, cleanCatalogue} from "./makeViewModel.js";
import {catalogue} from "../Model/cs_major.js";
import {dfs} from "./connectionsLogic.js";
import {calculateRequirements} from "./requirements.js";
import {fullMajorCheck} from "./requirements.js";

let Profile;
let ViewModel;

let initializeView = function () {

    let alert = new WelcomePanel();
    alert.render();
    $("#nextButton").on("click", alert.next);

    $('#profileData').submit((event) => {
        event.preventDefault();
        let profileString = ($('#profileData').serializeArray());

        for(let profCourse of profileString){
            let dfsCourse = dfs(profCourse.name);
            for (let postDfsCourse of dfsCourse){
                if(!(profileString.some((nextCourse) => nextCourse.name === postDfsCourse))){
                    profileString.push({name: postDfsCourse, value: "on"});
                }
            }
        }

        Profile = makeProfile(profileString);
        ViewModel = makeViewModel(Profile);


        initializeYearGrid();
        initializeButtonBar();
        initializeRequirementsPanel();
        positionInitialCourses(Profile);
        updateRequirementsCount(Profile);

    });

    function initializeYearGrid() {
        let years = ["Year 1", "Year 2", "Year 3", "Year 4"];
        let svgYears = d3.select("#graph").selectAll("yeargraphs")
            .data(years)
            .enter().append("div")
            .attr("class", "year")
            .html(function (d) {
                return String(d)
            });
    }
    function initializeButtonBar() {
        //BUTTON BAR
        let buttonBar = d3.select("body")
            .select("#buttonBar");

        buttonBar.append("button")
            .attr("id", "markTaken")
            .html("Mark as Taken");

        buttonBar.append("button")
            .attr("id", "markUntaken")
            .html("Mark as Planned");

        buttonBar.append("button")
            .attr("id", "delete")
            .html("Delete");

    }
};

let initialNodes = function(available, graphCourses) {
    let svgGroups = d3.select("#svgNotTaken").selectAll(".draggable")
        .data(available);

    svgGroups.enter()
        .append("div")
        .attr("id", function (d) {
            return d
        })
        .html(function (d) {
            return d.substr(4, 7)
        })
        .attr("class", "draggable available outGraph");

    //TAKEN COURSES. Color: Green
    let svgContainer = d3.select("#graph").selectAll(".draggable,.taken")
        .data(graphCourses);

    svgContainer.enter()
        .append("div")
        .attr("id", function (d) {
            return d.course
        })
        .html(function (d) {
            return d.course.substr(4, 7)
        })
        .style("top", function (d) {
            return d.x + 'px'
        })
        .style("left", function (d) {
            return d.y + 'px'
        })
        .attr("class", "draggable taken inGraph");

    svgGroups.exit().remove();
    svgContainer.exit().remove();

    positionTopBar();
    instructionsBinding();
};

let draw = function(ViewModel) {
    console.log("*******  DRAW CALLED");
    console.log("Here is what should be in the profile.");
    console.log(ViewModel.Classes);

    let availableCourses = notTaken(ViewModel.Classes);
    let plannedCourses = filterPlanned(ViewModel.Classes);
    let takenCourses = filterTaken(ViewModel.Classes);

    console.log("And here is what should be in the bar.");
    console.log(availableCourses);

    let inGraph = $(".inGraph");
    for (let course of inGraph){
        let element = document.getElementById(course.id);
        element.parentNode.removeChild(element);
    }

    let list = document.getElementById("svgNotTaken");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    //TAKEN COURSES. Color: Red
    let svgNotTaken = d3.select("#svgNotTaken").selectAll(".available")
        .data(availableCourses);

    svgNotTaken.enter()
        .append("div")
        .attr("id", function (d) {
            return d
        })
        .html(function (d) {
            return d.substr(4, 7)
        })
        .attr("class", "draggable available outGraph");

    //TAKEN COURSES. Color: Green
    let svgTaken = d3.select("#graph").selectAll(".taken")
        .data(takenCourses);

    svgTaken.enter()
        .append("div")
        .attr("id", function (d) {
            return d.course
        })
        .html(function (d) {
            return d.course.substr(4, 7)
        })
        .style("top", function (d) {
            return d.x + 'px'
        })
        .style("left", function (d) {
            return d.y + 'px'
        })
        .attr("class", "draggable taken inGraph");

    //TAKEN COURSES. Color: Orange
    let svgPlanned = d3.select("#graph").selectAll(".planned")
        .data(plannedCourses);

    svgPlanned.enter()
        .append("div")
        .attr("id", function (d) {
            return d.course
        })
        .html(function (d) {
            return d.course.substr(4, 7)
        })
        .style("top", function (d) {
            return d.x + 'px'
        })
        .style("left", function (d) {
            return d.y + 'px'
        })
        .attr("class", "draggable planned inGraph");

    positionTopBar();
    updateRequirementsCount(ViewModel.Classes);

    let isFullMajor = fullMajorCheck(ViewModel.Classes);
    if ( isFullMajor ){
        $("#majorText").text("This is a full major!")
    }

    instructionsBinding();

};

function instructionsBinding() {
    let allCourses = $(".draggable");
    allCourses.bind("mousedown", function () {
        $("#buttonBar").css("display", "block");
        let course = findCourse(catalogue, this);
        let prereq = course.prereq;
        let description = course.courseInfo;
        let name = course.name;
        let title = course.dept + course.courseNum;
        $("#welcomeText").css("display","none");
        $("#name").css("display","block").replaceWith("<p id='name'>" + title + "<br>" + name + "</p>");
        $("#courseDescription").css("display","block").replaceWith(
            "<p id='courseDescription'>" + description + "</p>"
        );
        $("#prereq").css("display","block").replaceWith(
            "<p id='prereq'>" + prereq + "</p>"
        );

    });
}


let initializeRequirementsPanel = function () {
    for (let obj of rules) {
        let inputLabel = "#" + String(obj.label);//this is the grouping of "intro", "core", "math", or "elective"
        let subRequirementList = d3.select(".requirements").select(inputLabel);

        if (inputLabel === "#intro") {
            d3.select("#introLabel").text("Intro Courses: ");

            let label = "";
            for (let course of obj.courses) {
                label += course + " or ";
            }
            label = label.substring(0, label.length - 4);//" or " = 4 chars

            subRequirementList
                .append("li")
                .attr("id", "#reqIntro")
                .text(label);

        }

        if (inputLabel === "#math" || inputLabel === "#elective"){
            let temp = obj.label.charAt(0).toUpperCase();//Making the first character capital
            d3.select("#" + obj.label + "Label").text(temp + obj.label.substring(1, obj.label.length) + " Courses: \t\t");
        }

        if (inputLabel === "#elective"){
            let temp = obj.label.charAt(0).toUpperCase();//Making the first character capital
            d3.select("#" + obj.label + "Label").text(temp + obj.label.substring(1, obj.label.length) + " Courses: \t\t");
        }

        if (inputLabel === "#core"){
            let temp = obj.label.charAt(0).toUpperCase();//Making the first character capital
            d3.select("#" + obj.label + "Label").text(temp + obj.label.substring(1, obj.label.length) + " Courses: \t\t");

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

function updateRequirementsCount(profile){
    let newCount = calculateRequirements(profile);
    for (let count of newCount){
        let string = "#" + Object.keys(count)[0] + "Label";
        $(string).text(Object.keys(count)[0].charAt(0).toUpperCase() + Object.keys(count)[0].slice(1) + " Courses: " + Object.values(count)[0]);
    }
}

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

function findCourse(data, course) {
    let ID = course.id;
    for (let object of data) {
        if ((object.dept + object.courseNum) === ID) {
            return object;
        }
    }
}

function notTaken(profile) {
    let toReturn = [];
    let compCat = cleanCatalogue();
    for (let course of compCat) {
        if (!profile.some((thing) => thing.course === course)) {
            toReturn.push(course);
        }
    }
    return toReturn;
}

function filterTaken(profile){
    return profile.filter((course) => course.status === "taken");
}

function filterPlanned(profile){
    return profile.filter((course) => course.status === "planned");
}

function positionInitialCourses(profile) {
    for (let course of profile) {
        if (course.course === "COMP123") {
            course.x = 250;
            course.y = 30
        }
        if (course.course === "COMP127") {
            course.x = 200;
            course.y = 130
        }
        if (course.course === "COMP128") {
            course.x = 230;
            course.y = 280
        }
        if (course.course === "MATH279") {
            course.x = 330;
            course.y = 280
        }
        if (course.course === "COMP240") {
            course.x = 190;
            course.y = 510
        }
        if (course.course === "COMP221") {
            course.x = 300;
            course.y = 510
        }
        if (course.course === "COMP225") {
            course.x = 150;
            course.y = 510
        }
    }
}


export {initializeView, draw, ViewModel, Profile, notTaken, initialNodes};