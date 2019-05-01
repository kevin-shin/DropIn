import makeConnections   from '../src/js/connectionsLogic.js';
import resetConnectionsArrays from '../src/js/connectionsLogic.js';

// const makeConnectionsModule = require('../src/js/connectionsLogic.js');

/*
Test suite for make connections function
Imports a module of functions from connectionsLogic.js

@param:
Profile: course as a string (i.e. "COMP123")

@output:
array of connection objects of the format   
[ { source: "COMP123", target: "COMP124" }, { source: ...} ]
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

test('math471 flattened array', () => {
    makeConnectionsModule.reset();
    expect(makeConnectionsModule.makeConnections("MATH471")).toMatchObject(
        [
            { source: "MATH365", target: "MATH471" },
            { source: "MATH376", target: "MATH471" },
            { source: "MATH377", target: "MATH471" },
            { source: "COMP120", target: "MATH365" },
            { source: "MATH236", target: "MATH365" },
            { source: "COMP123", target: "MATH365" },
            { source: "MATH279", target: "MATH236" },
            { source: "MATH137", target: "MATH236" },
            { source: "MATH135", target: "MATH236" },
            { source: "MATH135", target: "MATH137" },
            { source: "MATH279", target: "MATH376" },
            { source: "MATH236", target: "MATH376" },
            { source: "MATH237", target: "MATH377" },
            { source: "MATH137", target: "MATH237" }
        ]
    );
});

