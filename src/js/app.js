import { VMtoView } from "./VM_to_View.js";
import { drawConnections } from "./ViewConnections.js";



//Draw the ViewModel
VMtoView();
//Draw the connections, and instantiate all draggable behaviors
$(() => {
    drawConnections();
});