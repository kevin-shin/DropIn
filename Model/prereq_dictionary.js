var prereqDict = new Map();

let prereqDictFunc = function (courses) {
    for (var course of courses) {
        let courseDescription = course.dept + course.courseNum;
        prereqDict.set(courseDescription, course.prereq);
    }
}

console.log(prereqDict);
