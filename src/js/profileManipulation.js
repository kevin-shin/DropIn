import {dfs} from "./connectionsLogic.js";
// const dfs = require("./connectionsLogic.js");

/*
Set of functions to control Profile Manipulation behavior.
 */

/*
@param
inputArray: array returned by input form in welcome Panel
output: Profile, an array of objects representing a course. The course property holds the name of the course, and status
        corresponds to "taken" or "planned"
 */
let makeProfile = function (inputArray) {
    let Profile = [];
    for (let course of inputArray) {
        Profile.push({
            course: course.name,
            status: "taken"
        })
    }
    return Profile;
};

/*
@param
profile: A Profile object.
draggedCourse: the courseID of course
eventX: position of mouse X coordinate
eventY: position of mouse Y coordinate
output: Profile, an array of objects representing a course. The course property holds the name of the course,
        and status corresponds to "taken" or "planned". The draggedCourse, and all of its prerequisites, are
        pushed onto the profile.
*/
let addCourseToProfile = function (profile, draggedCourse, eventX, eventY) {
    let courseWithPrereqs = dfs(draggedCourse);
    let initialPositionX = eventX;
    let initialPositionY = eventY;
    for (let course of courseWithPrereqs) {
        if (!(profile.some((nextClass) => nextClass.course === course))) {
            profile.push({
                course: course,
                status: "planned",
                x: initialPositionX,
                y: initialPositionY
            });
            initialPositionX = updatePosx(initialPositionX);
            initialPositionY = updatePosy();
        }
    }
};

/*
@param
profile: A Profile object.
deletedCourse: the courseID of course
output: Profile, an array of objects representing a course. The deletedCourse is removed from the profile.
*/
let removeCourseFromProfile = function (profile, deletedCourse) {
    let i = 0;
    let j;
    for (let course of profile) {
        if (course.course === deletedCourse) {
            j = i;
        }
        i++;
    }
    profile.splice(j, 1);
};

/* markedCourse represents the ID of a course. Iterates through Profile and marks the course's property as taken */
let markasTaken = function (Profile, markedCourse) {
    let prereqs = dfs(markedCourse);
    for (let course of Profile) {
        if (prereqs.some((prereq) => prereq === course.course)) {
            course.status = "taken"
        }
    }
};

/* markedCourse represents the ID of a course. Iterates through Profile and marks the course's property as planned */
let markasPlanned = function (Profile, markedCourse) {
    for (let course of Profile) {
        let prereqs = dfs(course.course);
        if (course.course === markedCourse || prereqs.some(( prereq ) => prereq === markedCourse)) {
            course.status = "planned"
        }
    }
};

/*
@param
profile: A Profile object.
output: The profile, with all missing prereqs filled in.
*/
let fillPrereqs = function (Profile) {
    for (let course of Profile) {
        let prereqs = dfs(course.course);
        for (let prereq of prereqs) {
            if (!(Profile.some((alreadyCourse) => alreadyCourse.course === prereq))) {
                Profile.push({
                    course: prereq,
                    status: "planned",
                    x: updatePosx(course.x),
                    y: updatePosy()
                });
            }
        }
    }
};


//***********  PLACEMENT ALGORITHMS  ***********//

/*
* generates random int to be used in updating position
*/
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
 *updates x position for auto added prereqisites
 * @param initPos: initial x position of dragged course
 */
function updatePosx(initPos) {
    if (initPos < 30) {
        return initPos;
    } else if (initPos < 100) {
        var newPos = initPos - randomInt(50, 60);
        while (newPos < 0) {
            newPos = initPos - randomInt(50, 60);
        }
        return newPos;
    } else if (initPos < 200) {
        newPos = initPos - randomInt(60, 90);
        while (newPos < 0) {
            newPos = initPos - randomInt(60, 90);
        }
        return newPos;
    } else if (initPos < 400) {
        newPos = initPos - randomInt(60, 200);
        while (newPos < 0) {
            newPos = initPos - randomInt(60, 2000);
        }
        return newPos;
    } else if (initPos < 1000) {
        newPos = initPos - randomInt(60, 200);
        while (newPos < 0) {
            newPos = initPos - randomInt(60, 200);
        }
        return newPos;
    }
}

//Updates y position for program added prerequisites. Returns random int in appropriate spacing relative to the graph.
function updatePosy() {
    let graph = $("#graph");
    let statusBar = $("#statusBar");
    let minY = graph.offset().top + 15;
    let maxY = statusBar.offset().top - 60;
    return randomInt(minY,maxY)-graph.offset().top;
}


export {makeProfile, addCourseToProfile, removeCourseFromProfile, markasTaken, markasPlanned, fillPrereqs}
// module.exports = makeProfile;
// module.exports = addCourseToProfile();