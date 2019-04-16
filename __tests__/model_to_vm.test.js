import {Profile} from "../src/Model/profile.js";
import {rules} from "../src/Model/cs_major_rules.js";

/*
Test suite for Model to VM
Imports a profile and the rules for the major, and outputs a View Model.

@param:
Profile: contains information about courses taken or planned. JS Object.
rules: given rules of a major, JS object

@output:
VM: a JS object that accounts for all the courses in the major, assigning them a certain status.
This is then taken by VM_to_View and drawn on the screen.
 */

test("initialize ViewModel", () => {


});


test('comp225', () => {
    expect(makeConnectionsModule.makeConnections("COMP225")).toMatchObject(
        [
            { source: "COMP124", target: "COMP225" },
            { source: "COMP123", target: "COMP124" }
        ]
    );
});