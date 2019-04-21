//Custom AlertBox, created by following tutorial
//https://www.developphp.com/video/JavaScript/Custom-Alert-Box-Programming-Tutorial

import { drawOptions } from "./initializePanel.js";
import { ViewModel } from "../Model/ViewModel_Test.js";
import { drawConnections } from "./ViewConnections.js";
import { draw } from "./VM_to_View.js";

function initPanel() {

    let width = window.innerWidth;
    let height = window.innerHeight;

    let dialogOverlay = $("#dialogOverlay");
    let dialogBox = $("#dialogBox");
    let dialogNext = $("#dialogNext");

    this.render = function(){

        let position = String(width/2-700/2) + "px";

        dialogOverlay.css("display","block");
        dialogOverlay.css("height",height);
        dialogBox.css("top","50px");
        dialogBox.css("left", position);
        dialogBox.css("display", "block");
        drawOptions();
        dialogNext.html('<button form="profileData" type="submit" id="nextButton">Submit</button>');
    };

    this.next = function() {
        dialogBox.css("display", "none");
        dialogOverlay.css("display","none");

        draw(ViewModel);
        drawConnections(ViewModel.Connections);
    }
}

export { initPanel }