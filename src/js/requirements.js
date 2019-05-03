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

export {calculateRequirements}