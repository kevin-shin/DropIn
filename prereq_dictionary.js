var prereq_dict = new Map();

for (var course of courses) {
    let courseDescription = course.dept + course.course_num;
    prereq_dict.set(courseDescription, course.prereq);
}

console.log(prereq_dict);
