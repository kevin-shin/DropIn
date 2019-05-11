import {rules} from "../Model/cs_major_rules.js";
import {WelcomePanel} from "./WelcomePanel.js";
import {makeProfile} from "./profileManipulation.js";
import {makeViewModel, cleanCatalogue} from "./makeViewModel.js";
import {dfs} from "./connectionsLogic.js";
import {calculateRequirements, fullMajorCheck} from "./requirements.js";

let Profile;
let ViewModel;

/*
Called to draw the structure of the View. Renders the WelcomePanel, and takes information to initialize the Profile.
 */
let initializeView = function () {
    let alert = new WelcomePanel();
    alert.render();
    $("#nextButton").on("click", alert.next);

    $('#profileData').submit((event) => {
        event.preventDefault();
        let profileString = ($('#profileData').serializeArray());

        for (let profCourse of profileString) {
            let dfsCourse = dfs(profCourse.name);
            for (let postDfsCourse of dfsCourse) {
                if (!(profileString.some((nextCourse) => nextCourse.name === postDfsCourse))) {
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
        let years = ["FY Fall", "FY Spring", "SO Fall", "SO Spring", "JR Fall", "JR Spring", "SR Fall", "SR Spring"];
        let svgYears = d3.select("#graph").selectAll("yearGraphs")
            .data(years)
            .enter().append("div")
            .attr("class", "year")
            .attr("id", function(d) {return String(d).slice(0, 2) + String(d).slice(3);})
            .html(function (d) {
                return String(d)
            });
    }

    function initializeButtonBar() {
        let graph = $("#graph");
        let lastYear = $("#SRSpring");
        let width = lastYear.offset().left + lastYear.outerWidth() - graph.offset().left;

        let buttonBar = d3.select("#GUI")
            .append("div")
            .attr("id", "statusBar")
            .style("width", width + "px")
            .style("left",graph.offset().left + "px")
            .style("top", graph.offset().top + graph.height() + "px");

        buttonBar.append("button")
            .attr("id", "align")
            .html("Align");

        buttonBar.append("button")
            .attr("id", "missingPrereq")
            .html("Fill in Prereqs");

        buttonBar.append("button")
            .attr("id", "markTaken")
            .html("Mark as Taken");

        buttonBar.append("button")
            .attr("id", "markPlanned")
            .html("Mark as Planned");

        buttonBar.append("button")
            .attr("id", "delete")
            .html("Delete Course");
    }
};

/*
@param
ViewModel: A ViewModel object

draw() is called after each user-driven event. The ViewModel provides new information corresponding to an updated
Profile. draw() takes this ViewModel and updates the View.
 */
let draw = function (ViewModel) {
    //Given a ViewModel, calculate the not taken courses, the planned courses, and taken courses.
    let availableCourses = notTaken(ViewModel.Classes);
    let plannedCourses = filterPlanned(ViewModel.Classes);
    let takenCourses = filterTaken(ViewModel.Classes);

    //Split into Math and Computer Science courses
    let mathCourses = availableCourses.filter((course) => course.substr(0, 4) === "MATH");
    let compCourses = availableCourses.filter((course) => course.substr(0, 4) === "COMP");

    /*   Delete HTML elements in graphs */
    let inGraph = $(".inGraph");
    for (let course of inGraph) {
        let element = document.getElementById(course.id);
        element.parentNode.removeChild(element);
    }

    let list = document.getElementById("svgNotTaken");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    let mathList = document.getElementById("mathNotTaken");
    while (mathList.hasChildNodes()) {
        mathList.removeChild(mathList.firstChild);
    }

    //TAKEN COURSES. Color: Red
    let svgGroups = d3.select("#svgNotTaken").selectAll(".draggable")
        .data(compCourses);

    svgGroups.enter()
        .append("div")
        .attr("id", function (d) {
            return d
        })
        .html(function (d) {
            return d.substr(4, 7)
        })
        .attr("class", "draggable available compsci outGraph");

    let svgMathGroups = d3.select("#mathNotTaken").selectAll(".draggable")
        .data(mathCourses);

    svgMathGroups.enter()
        .append("div")
        .attr("id", function (d) {
            return d
        })
        .html(function (d) {
            return d.substr(4, 7)
        })
        .attr("class", "draggable available math outGraph");

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
            return d.y + 'px'
        })
        .style("left", function (d) {
            return d.x + 'px'
        })
        .attr("class", "draggable taken inGraph");

    //PLANNED COURSES. Color: Orange
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
            return d.y + 'px'
        })
        .style("left", function (d) {
            return d.x + 'px'
        })
        .attr("class", "draggable planned inGraph");

    positionTopBar();
    updateRequirementsCount(ViewModel.Classes);

    //Check if full major
    let isFullMajor = fullMajorCheck(ViewModel.Classes);
    if (isFullMajor) {
        $("#majorText").css("display","block");
    } else {
        $("#majorText").css("display","none");
    }
};

/*
For each category of rules, initialize a panel which holds the core courses and provides a section in which classes
are later populated if they qualify as filling that requirement.
 */
let initializeRequirementsPanel = function () {
    for (let obj of rules) {
        let inputLabel = "#" + String(obj.label);//this is the grouping of "intro", "core", "math", or "elective"
        let subRequirementList = d3.select(".requirements").select(inputLabel);

        if (inputLabel === "#math" || inputLabel === "#elective") {
            let temp = obj.label.charAt(0).toUpperCase();//Making the first character capital
            d3.select("#" + obj.label + "Label").text(temp + obj.label.substring(1, obj.label.length) + " Courses: \t\t");
        }

        if (inputLabel === "#elective") {
            let temp = obj.label.charAt(0).toUpperCase();//Making the first character capital
            d3.select("#" + obj.label + "Label").text(temp + obj.label.substring(1, obj.label.length) + " Courses: \t\t");
        }

        if (inputLabel === "#intro" | inputLabel === "#core") {
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

/*
Using the information reported by calculateRequirements(profile), update the Requirement Panel to reflect the requirements
now satisfied or not satisfied by current version of the profile.
 */
function updateRequirementsCount(profile) {
    let newCount = calculateRequirements(profile);
    for (let count of newCount) {
        let string = "#" + Object.keys(count)[0] + "Label";
        $(string).text(Object.keys(count)[0].charAt(0).toUpperCase() + Object.keys(count)[0].slice(1) + " Courses: " + Object.values(count)[0] + " Remaining");
    }

    $("li").css("opacity","1.0");

    //Iterates though profile, marking courses as opacity = 0.5 if taken
    for (let course of profile) {
        let reqSelectorString = "#req" + course.course;
        if ($(reqSelectorString) !== null) {
            $(reqSelectorString).css("opacity", "0.5");
        }
    }

    let mathRules = rules.filter((category) => category.label === "math")[0].courses;
    let electiveRules = rules.filter((category) => category.label === "elective")[0].courses;

    let mathProfile = [];
    let electiveProfile = [];

    for (let course of profile) {
        if (mathRules.some((requirement) => requirement === course.course)) {
            mathProfile.push(course);
        }
        if (electiveRules.some((requirement) => requirement === course.course)) {
            electiveProfile.push(course);
        }
    }

    $("#math").empty();
    $("#elective").empty();

    d3.select("#math").selectAll("newElements")
        .data(mathProfile)
        .enter().append("li")
        .attr("id", function (d) {
            return "req" + d.course
        })
        .style("opacity", "0.5")
        .append("label").text(function (d) {
        return d.course
    });

    d3.select("#elective").selectAll("newElements")
        .data(electiveProfile)
        .enter().append("li")
        .attr("id", function (d) {
            return "req" + d.course
        })
        .style("opacity", "0.5")
        .append("label").text(function (d) {
        return d.course
    });
}

//Equal spacing on the top course bar.
function positionTopBar() {
    const radius = 20;
    let compCourses = $(".draggable.available.compsci");
    let compLength = compCourses.length;
    let compWidth = $("#svgNotTaken").width() - 60;
    let compPlacement = compWidth / compLength;
    let i = 1;
    for (let course of compCourses) {
        $(course).css({
            top: $("#svgNotTaken").height() / 2 - (radius + 10),
            left: i * compPlacement - radius
        });
        i++;
    }
    let mathCourses = $(".draggable.available.math");
    let mathLength = mathCourses.length;
    let mathWidth = $("#mathNotTaken").width() - 60;
    let mathPlacement = mathWidth / mathLength;
    let j = 1;
    for (let course of mathCourses) {
        $(course).css({
            top: $("#mathNotTaken").height() / 2 - (radius + 10),
            left: j * mathPlacement - radius
        });
        j++;
    }
}

/*
@param:
profile: A profile.
output: An array of courses associated with courses in the catalog that are not reported as planned or taken by
        the user profile. This method is used to populate the top bar.
 */
function notTaken(profile) {
    let toReturn = [];
    let compCourses = cleanCatalogue();
    for (let course of compCourses) {
        if (!profile.some((thing) => thing.course === course)) {
            toReturn.push(course);
        }
    }
    return toReturn;
}

function filterTaken(profile) {
    return profile.filter((course) => course.status === "taken");
}

function filterPlanned(profile) {
    return profile.filter((course) => course.status === "planned");
}

//Method to control placement of courses when Profile is first initialize and displayed on the graph.
function positionInitialCourses(profile) {
    for (let course of profile) {
        if (course.course === "COMP120") {
            course.y = 400;
            course.x = 30
        }
        if (course.course === "COMP112") {
            course.y = 30;
            course.x = 30
        }
        if (course.course === "COMP123") {
            course.y = 250;
            course.x = 30
        }
        if (course.course === "COMP127") {
            course.y = 200;
            course.x = 130
        }
        if (course.course === "COMP128") {
            course.y = 230;
            course.x = 280
        }
        if (course.course === "COMP154") {
            course.y = 500;
            course.x = 30
        }
        if (course.course === "MATH279") {
            course.y = 160;
            course.x = 280
        }
        if (course.course === "COMP240") {
            course.x = 270;
            course.y = 460
        }
        if (course.course === "COMP221") {
            course.y = 90;
            course.x = 530
        }
        if (course.course === "COMP225") {
            course.y = 330;
            course.x = 400
        }
        if (course.course === "COMP261") {
            course.y = 230;
            course.x = 530
        }
        if (course.course === "COMP302") {
            course.y = 440;
            course.x = 350
        }
        if (course.course === "COMP320") {
            course.y = 520;
            course.x = 350
        }
        if (course.course === "COMP340") {
            course.y = 50;
            course.x = 590
        }
        if (course.course === "MATH137") {
            course.y = 50;
            course.x = 330
        }
        if (course.course === "MATH135") {
            course.y = 40;
            course.x = 150
        }
        if (course.course === "COMP342") {
            course.y = 320;
            course.x = 680
        }
        if (course.course === "COMP346") {
            course.y = 400;
            course.x = 590
        }
        if (course.course === "COMP365") {
            course.y = 520;
            course.x = 660
        }
        if (course.course === "MATH236") {
            course.y = 160;
            course.x = 600
        }
        if (course.course === "COMP380") {
            course.y = 90;
            course.x = 800
        }
        if (course.course === "COMP394") {
            course.y = 300;
            course.x = 800
        }
        if (course.course === "COMP440") {
            course.y = 200;
            course.x = 860
        }
        if (course.course === "COMP445") {
            course.y = 230;
            course.x = 800
        }
        if (course.course === "COMP465") {
            course.y = 460;
            course.x = 780
        }
        if (course.course === "COMP479") {
            course.y = 530;
            course.x = 850
        }
        if (course.course === "MATH379") {
            course.y = 270;
            course.x = 850
        }
        if (course.course === "MATH237") {
            course.y = 50;
            course.x = 850
        }
        if (course.course === "COMP484") {
            course.y = 140;
            course.x = 840
        }
        if (course.course === "COMP494") {
            course.y = 430;
            course.x = 840
        }
    }
}


export {initializeView, draw, ViewModel, Profile};