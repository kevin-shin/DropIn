const addCourseToProfile = require("../src/js/profileManipulation.js");

let beginnerProfile = [
    {
        course: "COMP123",
        status: "taken",
        x: 127,
        y: 384
    },
    {
        course: "COMP127",
        status: "planned",
        x: 274,
        y: 480
    },
    {
        course: "MATH279",
        status: "taken",
        x: 958,
        y: 274
    }
];

test('beginner profile add comp128', () =>{
    expect(addCourseToProfile(beginnerProfile, "COMP128", 382, 583)).toMatchObject(
        [
            {
                course: "COMP123",
                status: "taken",
                x: 127,
                y: 384
            },
            {
                course: "COMP127",
                status: "planned",
                x: 274,
                y: 480
            },
            {
                course: "MATH279",
                status: "taken",
                x: 958,
                y: 274
            },
            {
                course: "COMP128",
                status: "planned",
                x:382,
                y:583
            }
        ]
    )
});