import { makeConnections, dfs } from "./connections_logic.js";

// const dfs = require('./connections_logic');
// const makeConnections = require("./connections_logic");

/*  
 * Adds a course and its prereqs to the profile to be read by function writeSourceTarget for VM
 * Takes a profile and the course ("COMP225") that was just dragged onto the screen
 */
let updateProfile = function (profile, draggedCourse) {
    var courseWithPrereqs = dfs(draggedCourse);
    for (var course of courseWithPrereqs) {
        if (!(profile.some((nextClass) => nextClass.course === course))) {
            profile.push({
                course: course,
                status: "planned"
            })
        }
    }
};

/**
 * 
 * @param profile 
 * @param deletedCourse 
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
    viewModel.profile = profile;
    viewModel.connections =  connectionsArr;
    return viewModel;
};

export { writeSourceTarget, updateProfile, deleteCourseProfile };
    
// module.exports = {};
// module.exports.updateProfile = updateProfile;
// module.exports.writeSourceTarget = writeSourceTarget;