import {catalogue} from "../Model/cs_major.js";
import { makeConnections } from "./connectionsLogic.js";


let makeViewModel = function (profile) {
    let ViewModel = {};
    ViewModel.Classes = profile;
    ViewModel.Connections =  writeSourceTarget(profile);
    return ViewModel;
};

function writeSourceTarget(profile) {
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
}

function cleanCatalogue() {
    let compCourses = [];
    for (let course of catalogue){
        if (course.dept === "COMP") {
            compCourses.push( course.dept + course.courseNum )
        }
    }
    return compCourses;
}


export { makeViewModel, cleanCatalogue };