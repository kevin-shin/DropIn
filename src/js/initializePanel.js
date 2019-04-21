import { courseCatalog } from "./prereq_dictionary.js";

let drawOptions = function() {

    let keys = [];

    for (let course of courseCatalog.keys()) {
        if (course.substring(0,4) === "COMP") {
            keys.push(course);
        }
    }

    const third = Math.ceil(keys.length / 3);
    let leftSide = keys.slice(0, third);
    let middle = keys.slice(third, 2 * third);
    let rightSide = keys.slice(2 * third, keys.length);

    let inputs1 = d3.select('#column1').selectAll("courseOptions")
        .data(leftSide)
        .enter().append("p").lower()
        .text(function (d) {
            return d
        })
        .append("input").lower()
        .attr("type", "checkbox")
        .attr("dy", "1em")
        .attr("name", function (d) {
            return d
        });

    let inputs2 = d3.select('#column2').selectAll("courseOptions")
        .data(middle)
        .enter().append("p").lower()
        .text(function (d) {
            return d
        })
        .append("input").lower()
        .attr("type", "checkbox")
        .attr("dy", "1em")
        .attr("name", function (d) {
            return d
        });

    let inputs3 = d3.select('#column3').selectAll("courseOptions")
        .data(rightSide)
        .enter().append("p").lower()
        .text(function (d) {
            return d
        })
        .append("input").lower()
        .attr("type", "checkbox")
        .attr("dy", "1em")
        .attr("name", function (d) {
            return d
        });

};


export { drawOptions }