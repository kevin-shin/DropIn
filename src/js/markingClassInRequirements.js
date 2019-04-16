import {rules} from "../Model/cs_major_rules"; //doesn't like "{" but Kevin's ViewConnections.js works (and still doesn't like it


//Function to make all the classes in cs_major_rules.js int ul items
//ToDo Say the number of classes required in each subRequirementList
let makeRequirements = function(){
    for(let label in rules) {
        let subRequirementList = d3.select("#" + label).data(label.courses);//To get the array associated

        // subRequirementList          TEST--> Just makes ul elements
        //     .enter()
        //     .append("li")
        //     .attr("class",label+"Course")
        //     .text(function(d){return d});

        subRequirementList
            .enter()
            .append("li").attr("id", function(d){return d}) //info about list item, should be identifiable by its name "COMP###" or "MATH###"
            .append("label").text(function(d){return d}) //text for the list item (same text as the id)
            .append("input").attr("type", "checkBox")// making the list item a checkbox

    }
};

//I'm not positive how Kevin's function works but I will talk to him about that
//
let checkRequirementBoxes = function (classAdded){
    let boxToBeChecked = d3.select(".Requirements").select("#"+classAdded);//select the "li" element to be toggled

    if(!($(boxToBeChecked).checked)){//if the box is not checked
        $(boxToBeChecked).toggle(this.checked)
    }
};