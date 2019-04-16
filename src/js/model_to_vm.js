import { makeConnections, dfs } from "./connections_logic";

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
        profile.push({
            course: draggedCourse,
            status: "planned"
        });
    };
};


/*
 *  Reads a profile and outputs JSON object with source target components for VM
 *  Output lools like {source: "COMP123", target: "COMP124"}
 */
let writeSourceTarget = function (profile) {
    var connections = [];
    for (node of profile) {
        makeConnections(node.course);
        if (!connections.some((conn) => conn.source === prereq && conn.target === course)) {
            connections.push({
                "source": prereq,
                "target": course
            });
        }
    }
   return connections;
}


// let fullMajorCheck = function (profile, majorRules) {
//     for (course in profile.profile) {
//         if (course in majorRules.intro) {
//             profile.requirements.intro--;
//         }
//         else if (course in majorRules.core) {
//             profile.requirements.core--;
//         }
//         else if (course in majorRules.math) {
//             profile.requirements.math--;
//         }
//         else if (course in majorRules.elective) {
//             profile.requirements.elective--;
//         }
//     }
//     if (profile.requirements.intro == 0 && profile.requirements.core == 0 && profile.requirements.math == 0 && profile.requirements.elective == 0) {
//         return true;
//     }
//     return false;
// }