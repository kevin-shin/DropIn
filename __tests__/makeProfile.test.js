const profManipModule = require("../src/js/profileManipulation.js");

let beginnerArray = [
    { name: "COMP123", value: "on" },
    { name: "COMP127", value: "on" },
    { name: "COMP128", value: "on" }
];

let noCourse = [];

test('simple 3 course', () => {
    expect(profManipModule.makeProfile(beginnerArray)).toMatchObject(
        [
            { course: "COMP123", status: "taken" },
            { course: "COMP127", status: "taken" },
            { course: "COMP128", status: "taken" }
        ]
    )
});

let manyCourses = [
    { name: "COMP123", value: "on" },
    { name: "COMP127", value: "on" },
    { name: "COMP128", value: "on" },
    { name: "MATH279", value: "on" },
    { name: "COMP225", value: "on" },
    { name: "COMP320", value: "on" }
];

test('no courses selected', () => {
    expect(profManipModule.makeProfile(noCourse)).toMatchObject(
        []
    )
});

test('many courses selected', () => {
    expect(profManipModule.makeProfile(manyCourses)).toMatchObject(
        [
            { course: "COMP123", status: "taken" },
            { course: "COMP127", status: "taken" },
            { course: "COMP128", status: "taken" },
            { course: "MATH279", status: "taken" },
            { course: "COMP225", status: "taken" },
            { course: "COMP320", status: "taken" }
        ]
    )
});

