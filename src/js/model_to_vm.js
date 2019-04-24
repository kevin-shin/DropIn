import { makeConnections, dfs } from "./connections_logic.js";

// const dfs = require('./connections_logic');
// const makeConnections = require("./connections_logic");

//initialize VM. input profile and major logic output viewmodel.
let initializeVM = function(profile, rules){
    let VM = [];

    //Intro courses
    for (let course of rules.intro.courses){
        if (profile.some((element) => course === element)){
            VM.push({
                course: course,
                taken: true,
                required: true
            })
        }
        else {
            VM.push({
                course: course,
                taken: false,
                required: true
            })
        }
    }

    //Core courses
    for (let course of rules.core.courses){
        if (profile.some((element) => course === element)){
            VM.push({
                course: course,
                taken: true,
                required: true
            })
        }
        else {
            VM.push({
                course: course,
                taken: false,
                required: true
            })
        }
    }

    //Math courses
    for (let course of rules.math.courses) {
        if (profile.some((element) => course === element)){
            VM.push({
                course: course,
                taken: true,
                required: false
            })
        }
        else {
            VM.push({
                course: course,
                taken: false,
                required: false
            })
        }
    }

    for (let course of rules.elective.courses){
        if (profile.some((element) => course === element)){
            VM.push({
                course: course,
                taken: true,
                required: false
            })
        }
        else {
            VM.push({
                course: course,
                taken: false,
                required: false
            })
        }
    }
    return VM;
};




/*  
 * Adds a course and its prereqs to the profile to be read by function writeSourceTarget for VM
 * Takes a profile and the course ("COMP225") that was just dragged onto the screen
 */
let updateProfile = function (profile, draggedCourse) {
    var courseWithPrereqs = dfs(draggedCourse);
    for (course of courseWithPrereqs) {
        if (!profile.some((prof) => prof.course === course)) {
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
    for (course of profile) {
        if (course.course == deletedCourse) {
            profile.pop(course);
        }
    }
};

/*
 *  Reads a profile and outputs JSON object with source target components for VM
 *  Output lools like {source: "COMP123", target: "COMP124"}
 */
let writeSourceTarget = function (profile) {
    var connections = [];
    var tempConn = [];
    for (node of profile) {
        tempConn = makeConnections(node.course);
        for (var conn of tempConn) {
            if (!connections.some((next) => next.source === conn.source && next.target === conn.target)) {
                connections.push(conn);
            }
        }
    }
    return connections;
}

export { makeConnections, writeSourceTarget, updateProfile, deleteCourseProfile };
    
// module.exports = {};
// module.exports.updateProfile = updateProfile;
// module.exports.writeSourceTarget = writeSourceTarget;