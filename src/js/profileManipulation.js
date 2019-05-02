import { dfs } from "./connectionsLogic.js";

let makeProfile = function(inputArray){
    let Profile = [];
    for (let course of inputArray) {
        Profile.push({
            course: course.name,
            status: "taken"
        })
    }
    return Profile;
};

let addCourseToProfile = function (profile, draggedCourse, eventX, eventY) {

    var courseWithPrereqs = dfs(draggedCourse);
    console.log("Prereqs: ");
    console.log(courseWithPrereqs);
    let initialPositionX = eventX;
    let initialPositionY = eventY;
    for (var course of courseWithPrereqs) {
        if (!(profile.some((nextClass) => nextClass.course === course))) {
            profile.push({
                course: course,
                status: "planned",
                x: initialPositionX,
                y: initialPositionY
            });
            initialPositionX -= 100;
            initialPositionY -= 100;
        }
    }
};

let removeCourseFromProfile = function (profile, deletedCourse) {
    for (var course of profile) {
        if (course.course === deletedCourse) {
            profile.pop(course);
        }
    }
};


export { makeProfile, addCourseToProfile, removeCourseFromProfile }