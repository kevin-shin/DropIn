var prereq_dict ={};

for(var course of courses) {
    prereq_dict[course.dept + course.course_num] = [course.prereq];
}

console.log(prereq_dict);
