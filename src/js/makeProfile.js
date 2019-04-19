let makeProfile = function(inputArray){
    let Profile = [];
    for (let course of inputArray) {
        Profile.push({
            course: course.name,
            status: "taken"
        })
    }
    return Profile;
};

export { makeProfile }