var prereqDict = new Map();

let makePrereqDict = function (courses) {
    for (var course of courses) {
        let courseDescription = course.dept + course.courseNum;
        prereqDict.set(courseDescription, course.prereq);
    }
}
makePrereqDict(courses);
console.log(prereqDict);
