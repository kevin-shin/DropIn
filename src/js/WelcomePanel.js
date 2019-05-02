import { drawConnections } from "./UIBehavior.js";
import { animateNode } from "./exampleAnimation.js";
import { ViewModel } from "./VMtoView.js";
import { implementDragBehavior } from "./UIBehavior.js";
import { initialNodes } from "./VMtoView.js";
import { courseCatalog } from "./prereq_dictionary.js";
import { notTaken} from "./VMtoView.js";

let width = window.innerWidth;
let height = window.innerHeight;

let dialogOverlay = $("#dialogOverlay");
let introBox = $("#introBox");
let exampleBox = $("#example");
let introNext = $("#introNext");
let exampleNext = $("#exampleNext");


function WelcomePanel() {
    this.render = function(){
        let position = String(width/2-700/2) + "px";

        dialogOverlay.css("display","block");
        dialogOverlay.css("height",height);
        introBox.css("top","50px");
        introBox.css("left", position);
        introBox.css("display", "block");

        drawOptions();
        introNext.html('<button form="profileData" type="submit" id="nextButton">Submit</button>');
    };

    this.next = function() {
        introBox.css("display", "none");
        let intro = new InputPanel();
        intro.render();
        animateNode();
        $("#startButton").on("click", intro.next);
    }
}

function InputPanel() {
    this.render = function(){
        let position = String(width/2-700/2) + "px";
        exampleBox.css("top","50px");
        exampleBox.css("left", position);
        exampleBox.css("display", "block");
        exampleNext.html('<button type="submit" id="startButton">Start </button>');
    };

    this.next = function() {
        exampleBox.css("display", "none");
        dialogOverlay.css("display","none");

        console.log(ViewModel);
        let graphCourses = ViewModel.Classes.filter((course => course.status === "taken") || (course => course.status === "planned"));
        let available = notTaken(ViewModel.Classes);

        initialNodes(available, graphCourses);
        drawConnections(ViewModel.Connections);
        implementDragBehavior();
    }
}


function drawOptions() {
    let keys = [];

    for (let course of courseCatalog.keys()) {
        if (course.substring(0,4) === "COMP" || course === "MATH279") {
            keys.push(course);
        }
    }

    const third = Math.ceil(keys.length / 3);
    let leftSide = keys.slice(0, third);
    let middle = keys.slice(third, 2 * third);
    let rightSide = keys.slice(2 * third, keys.length);

    let inputs1 = d3.select('#column1').selectAll("courseOptions")
        .data(leftSide)
        .enter().append("p")
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
        .enter().append("p")
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
        .enter().append("p")
        .text(function (d) {
            return d
        })
        .append("input").lower()
        .attr("type", "checkbox")
        .attr("dy", "1em")
        .attr("name", function (d) {
            return d
        });
}


export { WelcomePanel, InputPanel }