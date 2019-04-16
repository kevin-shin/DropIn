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
};

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