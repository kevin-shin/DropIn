const makeConnectionsModule = require('../src/js/connections_logic.js');

/*
Test suite for makeConnections function
As of 4.12.19, makeConnections DOES NOT WORK FOR CLASSES WITH PREREQUISITE PATH OPTIONS
Juliet Kelson
*/

test('comp225', () => {
    expect(makeConnectionsModule.makeConnections("COMP225")).toMatchObject(
        [
            { source: "COMP124", target: "COMP225" },
            { source: "COMP123", target: "COMP124" }
        ]
    );
});



//making sure reset works so that courses from above test is not included
test('124', () => {
    makeConnectionsModule.reset();
    expect(makeConnectionsModule.makeConnections("COMP124")).toMatchObject(
        [
            { source: "COMP123", target: "COMP124" }
        ]
    );
});

//test includes courses from above test and ensures duplicates are not included
test('124, 261', () => {
    expect(makeConnectionsModule.makeConnections("COMP261")).toMatchObject(
        [
            { source: "COMP123", target: "COMP124" },
            { source: "COMP124", target: "COMP261" },
            { source: "MATH279", target: "COMP261" }
        ]
    );
});

//3 courses together
test('comp484 and 261 and 124', () => {
    expect(makeConnectionsModule.makeConnections("COMP484")).toMatchObject(
        [
            { "source": "COMP123", "target": "COMP124" },
            { "source": "COMP124", "target": "COMP261" },
            { "source": "MATH279", "target": "COMP261" },
            { "source": "COMP221", "target": "COMP484" },
            { "source": "COMP124", "target": "COMP221" },
            { "source": "MATH279", "target": "COMP221" }
        ]
    );
});


//reset and test one of above courses
test('comp484 alone', () => {
    makeConnectionsModule.reset();
    expect(makeConnectionsModule.makeConnections("COMP484")).toMatchObject(
        [
            { "source": "COMP221", "target": "COMP484" },
            { "source": "COMP124", "target": "COMP221" },
            { "source": "MATH279", "target": "COMP221" },
            { "source": "COMP123", "target": "COMP124" }
        ]
    );
});

