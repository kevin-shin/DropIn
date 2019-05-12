import {rules} from "../Model/cs_major_rules.js";
import {dfs} from "./connectionsLogic.js";

/*
input: A Profile
output: An object representing the number of courses left to be filled in each category of the rules of the major.
        Each property corresponds to a category of the rules, and the associated value is an integer. Used to populate
        the requirements panel of the UI.
 */
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

/*
input: A Profile
output: true/false; true if the profile represents a full major, false otherwise.
 */
let fullMajorCheck = function(profile){
    let categoryCount = calculateRequirements(profile);
    //Check that each major count has been satisfied
    for (let category of categoryCount){
        if (Object.values(category)[0] !== 0){
            return false;
        }
    }
    //Also check that for each course, the prereqs are accounted for
    for (let course of profile){
        let prereqs = dfs(course.course);
        for (let prereq of prereqs){
            if (!profile.some((course) => course.course === prereq)){
                return false;
            }
        }
    }
    //if both these conditions are satisfied, return true
    return true;
};


export {calculateRequirements, fullMajorCheck}