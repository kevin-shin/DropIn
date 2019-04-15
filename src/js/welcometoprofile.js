import {courseCatalog} from "./prereq_dictionary.js";

let keys = [];
let profileInput;
let userProfile;

for (let course of courseCatalog.keys()){
    keys.push(course);
}

const half = Math.ceil(keys.length / 2);
let leftSide = keys.slice(0,half);
let rightSide = keys.slice(half, keys.length);

let inputs1 = d3.select('#column1').selectAll("courseOptions")
    .data(leftSide)
    .enter().append("p").lower()
    .text(function(d) {return d})
    .append("input").lower()
    .attr("type","checkbox")
    .attr("dy","1em")
    .attr("name",function(d) {return d});

let inputs2 = d3.select('#column2').selectAll("courseOptions")
    .data(rightSide)
    .enter().append("p").lower()
    .text(function(d) {return d})
    .append("input").lower()
    .attr("type","checkbox")
    .attr("dy","1em")
    .attr("name",function(d) {return d});


$('#profileData').submit((event) => {
    event.preventDefault();
    profileInput = $('#profileData').serializeArray();
    userProfile = makeProfile(profileInput);
});

let makeProfile = function(input) {
    let Profile = [];
    for (let choice of input){
        Profile.push({
            course: choice.name,
            status: "taken"
        })
    }
    userProfile = Profile;
};


export { userProfile }