import {rules} from "../Model/cs_major_rules.js";
import {WelcomePanel} from "./WelcomePanel.js";
import {makeProfile} from "./profileManipulation.js";
import {deleteButton, focus} from "./ViewConnections.js";
import {makeViewModel, cleanCatalogue} from "./makeViewModel.js";

let Profile;
let ViewModel;

let initializeView = function () {
    initializePanels();
    let alert = new WelcomePanel();
    alert.render();
    $("#nextButton").on("click", alert.next);

    $('#profileData').submit((event) => {
        event.preventDefault();
        let profileString = ($('#profileData').serializeArray());

        Profile = makeProfile(profileString);
        ViewModel = makeViewModel(Profile);

        positionInitialCourses(Profile);
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
        .on("click", deleteButton);

    let garbage = d3.select("#graph")
        .append("div")
        .attr("id", "garbage")

};

let initialNodes = function(available, graphCourses) {
    var svgGroups = d3.select("#svgNotTaken").selectAll(".draggable")
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
};

let draw = function(ViewModel) {

    let availableCourses = notTaken(ViewModel.Classes);

    console.log("*******  DRAW CALLED");
    console.log("Here is what should be in the profile.");
    console.log(ViewModel.Classes);

    console.log("And here is what should be in the bar.");
    console.log(availableCourses);

    var svgGroups = d3.select("#svgNotTaken").selectAll(".draggable")
        .data(availableCourses);

    svgGroups.exit().remove();

    svgGroups.enter()
        .append("div")
        .attr("id", function (d) {
            return d
        })
        .html(function (d) {
            return d.substr(4, 7)
        })
        .attr("class", "draggable availableCourses outGraph");

    //TAKEN COURSES. Color: Green
    let svgContainer = d3.select("#graph").selectAll(".draggable,.taken")
        .data(ViewModel.Classes);

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
        .attr("class", "draggable planned inGraph");

    svgContainer.exit().remove();
    positionTopBar();
};


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

let introNumReqs = rules[0].required, coreNumReqs = rules[1].required;
let mathNumReqs = rules[2].required, electiveNumReq = rules[3].required;

let decrementNumReqs = function (classDropped) {
    let reqToDecrement; //will be one of the labels in rules
    for (let obj of rules) {
        for (let course of obj.courses) {
            if (course === classDropped) {
                reqToDecrement = obj.label;
                console.log("REQ TO DECREMENT");
                console.log(reqToDecrement);
            }
        }
    }

    switch (reqToDecrement) {//Decrementing reqToDecrement
        case "intro":
            introNumReqs--;
            break;
        case "core":
            coreNumReqs--;
            break;
        case "math":
            mathNumReqs--;
            break;
        case "elective":
            electiveNumReq--;
            break;
        default:
            console.log("reqToDecrement variable miss-assigned")

    }

    d3.select("#" + reqToDecrement + "Label")
        .html(reqToDecrement.toUpperCase().charAt(0) +  //first letter capitalized
            reqToDecrement.substring(1, reqToDecrement.length) + //rest lowercase
            " Courses : " + (reqToDecrement + "NumReqs")); //previous number of reqs - 1
    console.log(reqToDecrement.toUpperCase().charAt(0) +  //first letter capitalized
        reqToDecrement.substring(1, reqToDecrement.length) + //rest lowercase
        " Courses : " + (reqToDecrement + "NumReqs"))
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

function notTaken(profile) {
    let toReturn = ["MATH279"];
    let compCat = cleanCatalogue();
    for (let course of compCat) {
        if (!profile.some((thing) => thing.course === course)) {
            toReturn.push(course);
        }
    }
    return toReturn;
}

function markTaken() {
    focus.addClass("taken").removeClass("available")
}

function markUntaken() {
    focus.addClass("available").removeClass("taken")
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