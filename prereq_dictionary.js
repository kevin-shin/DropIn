let prereq_dict ={};

for(var i = 0; i < courses.length; i++) {
    var obj = courses[i];
    prereq_dict[obj.dept + obj.course_num] = [obj.prereq];
}