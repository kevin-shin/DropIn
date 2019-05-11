const profManipModule = require("../src/js/profileManipulation.js");

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

profManipModule.addCourseToProfile(beginnerProfile, "COMP225", 327, 391);

test('add course with no prereq', () => {
    expect(beginnerProfile).toMatchObject(
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
                course: "COMP225",
                status: "planned",
                x: 327,
                y: 391
            }
        ]
    )

});

let planningProfile = [
    {
        course: "COMP123",
        status: "planned",
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
        status: "planned",
        x: 958,
        y: 274
    }
];

profManipModule.addCourseToProfile(planningProfile, "COMP240", 327, 391);

test('add course with  prereqs', () => {
    expect(planningProfile).toMatchObject(
            [{
                "course": "COMP123",
                "status": "planned",
                "x": 127,
                "y": 384
            },
            {
                "course": "COMP127",
                "status": "planned",
                "x": 274,
                "y": 480
            },   
            {
                "course": "MATH279",
                "status": "planned",
                "x": 958,
                "y": 274
            },
            {
                course: "COMP240",
                status: "planned",
                x: expect.any(Number),
                y: expect.any(Number)
            },
            {
                course: "COMP128",
                status: "planned",
                x: expect.any(Number),
                y: expect.any(Number)
            }
        ]
    )

});

let intermediateProfile = [
    {
        course: "COMP123",
        status: "taken",
        x: 127,
        y: 384
    },
    {
        course: "COMP127",
        status: "taken",
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
        status: "taken",
        x: 264,
        y: 482
    },
    {
        course: "COMP225",
        status: "planned",
        x: 463,
        y: 736
    },
    {
        course: "COMP240",
        status: "planned",
        x: 463,
        y: 856
    }
];

profManipModule.addCourseToProfile(intermediateProfile, "MATH253", 327, 391);

test('profile with many courses, add course with prerequisites', () => {
    expect(intermediateProfile).toMatchObject(
        [
            {
                course: "COMP123",
                status: "taken",
                x: 127,
                y: 384
            },
            {
                course: "COMP127",
                status: "taken",
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
                status: "taken",
                x: 264,
                y: 482
            },
            {
                course: "COMP225",
                status: "planned",
                x: 463,
                y: 736
            },
            {
                course: "COMP240",
                status: "planned",
                x: 463,
                y: 856
            },
            {
                course: "MATH253",
                status: "planned",
                x: 327,
                y:391
            },
            {
                course: "MATH155",
                status: "planned",
                x: expect.any(Number),
                y: expect.any(Number)
            }
        ]
    )

});