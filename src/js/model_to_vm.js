import { makeConnections, dfs } from "./connections_logic.js";

// const dfs = require('./connections_logic');
// const makeConnections = require("./connections_logic");

/*  
 * Adds a course and its prereqs to the profile to be read by function writeSourceTarget for VM
 * Takes a profile and the course ("COMP225") that was just dragged onto the screen
 */
let updateProfile = function (profile, draggedCourse) {
    var courseWithPrereqs = dfs(draggedCourse);
    for (let course of courseWithPrereqs) {
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
    for (let course of profile) {
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
    let connections;
    for (let node of profile) {
        connections = makeConnections(node.course);

    }
   return connections;
};

export { writeSourceTarget, updateProfile, deleteCourseProfile };
    
// module.exports = {};
// module.exports.updateProfile = updateProfile;
// module.exports.writeSourceTarget = writeSourceTarget;