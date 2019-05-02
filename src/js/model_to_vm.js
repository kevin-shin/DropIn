import { makeConnections, dfs } from "./connections_logic.js";

// const dfs = require('./connections_logic');
// const makeConnections = require("./connections_logic");

/*
 * Adds a course and its prereqs to the profile to be read by function writeSourceTarget for VM
 * Takes a profile and the course ("COMP225") that was just dragged onto the screen
 *
 * @param: profile a distinct user profile that describes planned and taken courses
 * @param: draggedCourse the string name of a course just dragged into the graph
 * @param: eventX
 * @param: eventY
 */
let updateProfile = function (profile, draggedCourse, eventX, eventY) {
    var courseWithPrereqs = dfs(draggedCourse);
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
            console.log("I'm pushing course" + course);
            initialPositionX -= 100;
            initialPositionY -= 100;
        }

    }

};

/**
 * removes only the deleted course from the profile
 * @param profile: a distinct user profile that describes planned and taken courses
 * @param deletedCourse: course just deleted from proflie
 */
let deleteCourseProfile = function (profile, deletedCourse) {
    for (var course of profile) {
        if (course.course === deletedCourse) {
            profile.pop(course);
        }
    }

};

/*
 *  Reads a profile and outputs JSON object with source target components for VM
 *  Output looks like {source: "COMP123", target: "COMP124"}
 *  @param profile: a distinct user profile that describes planned and taken courses
 */
let writeSourceTarget = function (profile) {
    var connections = [];
    var tempConn = [];
    for (var node of profile) {
        tempConn = makeConnections(node.course);
        for (var conn of tempConn) {
            if (!connections.some((next) => next.source === conn.source && next.target === conn.target)) {
                connections.push(conn);
            }
        }
    }
   return connections;
};

let writeVM = function (profile, connectionsArr) {
    var viewModel = {};
    viewModel.Classes = profile;
    viewModel.Connections =  connectionsArr;
    return viewModel;
};

export { writeSourceTarget, updateProfile, deleteCourseProfile, writeVM };
    
// module.exports = {};
// module.exports.updateProfile = updateProfile;
// module.exports.writeSourceTarget = writeSourceTarget;