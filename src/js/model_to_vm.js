let modelToVM = function (profile, majorRules, draggedCourse) {
    makeConnections(draggedCourse);
    for (var course of adjList) {
            var dept = course.source.slice(0, 5);
            var courseNum = course.source.slice(5);
            profile.profile.push({
                "course": course.source,
                "dept": dept,
                "courseNum": courseNum,
                "status": "sysAdded"
            })
        
    }
    // return fullMajorCheck(profile, majorRules);

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