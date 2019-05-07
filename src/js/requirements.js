import {rules} from "../Model/cs_major_rules.js";

let calculateRequirements = function(profile) {
      let count = [];
      for (let category of rules) {
          let object = {};
          let requiredNumber = category.required;
          let categoryCourses = category.courses;
          for (let course of profile){
              if (categoryCourses.some((requirement) => requirement === course.course) && requiredNumber > 0) {
                  requiredNumber--;
              }
          }
          object[category.label] = requiredNumber;
          count.push(object);
      }
      return count;
};

let fullMajorCheck = function(profile){
    let categoryCount = calculateRequirements(profile);
    for (let category of categoryCount){
        if (Object.values(category)[0] !== 0){
            return false;
        }
    }
    return true;
};


export {calculateRequirements, fullMajorCheck}