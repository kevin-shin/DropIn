const writeSourceTarget = require("../src/js/makeViewModel.js");

let noConnProfile = [
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
    }
];

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
        y:856
    }
];

let mathyIntermProfile = [
    {
        course: "MATH313",
        status: "taken",
        x: 127,
        y: 384
    },
    {
        course: "MATH312",
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
        course: "MATH236",
        status: "taken",
        x: 356,
        y: 463
    },
    {
        course: "MATH237",
        status: "planned",
        x: 384,
        y:582
    },
    {
        course: "MATH137",
        status: "taken",
        x: 163,
        y: 261
    },
    {
        course: "MATH135",
        status: "taken",
        x: 46,
        y: 290
    }
];

let noTakenProfile = [
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
    },
    {
        course: "COMP128",
        status: "planned",
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
        y:856
    }
];


test('simple profile no taken connections', () => {
    expect(writeSourceTarget(noConnProfile)).toMatchObject(
        []
    )
});

test('one connection simple', () => {
    expect(writeSourceTarget(beginnerProfile)).toMatchObject(
        [{ source: "COMP123", target: "COMP127" }]
    )
});

test('many connections intermediate', () => {
    expect(writeSourceTarget(intermediateProfile)).toMatchObject(
        [
            { source: "COMP127", target: "COMP225" },
            { source: "COMP128", target: "COMP240"}
        ]
    )
});

test('many connections mathy', () => {
    expect(writeSourceTarget(mathyIntermProfile)).toMatchObject(
        [
            { source: "MATH236", target: "MATH312" },
            { source: "MATH237", target: "MATH312" },
            { source: "MATH137", target: "MATH237"}
        ]
    )
});

test('all planned', () => {
    expect(writeSourceTarget(noTakenProfile)).toMatchObject(
        [
            { source: "COMP123", target: "COMP127" },
            { source: "COMP127", target: "COMP128" },
            { source: "COMP127", target: "COMP225" },
            { source: "COMP128", target: "COMP240"}
        ]
    )
});