var prereqDict = new Map();

for (var course of courses) {
    let courseDescription = course.dept + course.courseNum;
    prereqDict.set(courseDescription, course.prereq);
}

console.log(prereqDict);
