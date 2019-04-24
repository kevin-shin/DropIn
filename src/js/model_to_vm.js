import { makeConnections, dfs } from "./connections_logic.js";

// const dfs = require('./connections_logic');
// const makeConnections = require("./connections_logic");

/*  
 * Adds a course and its prereqs to the profile to be read by function writeSourceTarget for VM
 * Takes a profile and the course ("COMP225") that was just dragged onto the screen
 */
let updateProfile = function (profile, draggedCourse) {
    var courseWithPrereqs = dfs(draggedCourse);
    for (course of courseWithPrereqs) {
        profile.push({
            course: draggedCourse,
            status: "planned"
        })
    }
};

/**
 * 
 * @param profile 
 * @param deletedCourse 
 */
let deleteCourseProfile = function (profile, deletedCourse) {
    for (course of profile) {
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
<<<<<<< HEAD
    var connections = [];
    var tempConn = [];
    for (node of profile) {
        tempConn = makeConnections(node.course);
        for (var conn of tempConn) {
            if (!connections.some((next) => next.source === conn.source && next.target === conn.target)) {
                connections.push(conn);
            }
        }
=======
    let connections;
    for (let node of profile) {
        connections = makeConnections(node.course);

>>>>>>> 07e89ab3828a3834662ea82914fdc5818ea4158f
    }
   return connections;
};

export { writeSourceTarget, updateProfile, deleteCourseProfile };
    
// module.exports = {};
// module.exports.updateProfile = updateProfile;
// module.exports.writeSourceTarget = writeSourceTarget;