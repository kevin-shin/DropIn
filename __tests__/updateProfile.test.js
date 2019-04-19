const vmUpdateModule = require('../src/js/model_to_vm.js');

/*
Test suite for updateProfile function
Imports a module of functions from model_to_vm.js and uses the updateProfile function

@param:
profile: contains information about courses taken or planned.
draggedCourse: course just dragged onto the screen as a string (i.e. "COMP123")

@output:
profile with dragged course and its prerequisites with status "planned"
*/

let minimalProf = [
    {
        course: "COMP123",
        status: "taken"
    },
    {
        course: "COMP127",
        status: "taken"
    }
];

test('minimalProf + comp128', () => {
    expect(vmUpdateModule.updateProfile(minimalProf, "COMP128")).toMatchObject([
        {
            course: "COMP123",
            status: "taken"
        },
        {
            course: "COMP127",
            status: "taken"
        },
        {
            course: "COMP128",
            status: "planned"
        }
    ]);
});

test('minimalProf + comp221 adds 279', () => {
    expect(vmUpdateModule.updateProfile(minimalProf, "COMP221")).toMatchObject([
        {
            course: "COMP123",
            status: "taken"
        },
        {
            course: "COMP127",
            status: "taken"
        },
        {
            course: "COMP128",
            status: "planned"
        },
        {
            course: "MATH279",
            status: "planned"
        },
        {
            course: "COMP221",
            status: "planned"
        }
    ]);
});