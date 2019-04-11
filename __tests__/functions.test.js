const functions = require('../src/js/functions');

test("Adds 2+2 = 4",() => {
    expect(functions.add(2,2)).toBe(4);
    expect(functions.add(3,7)).toBe(10);
    // expect(functions.add(4,4)).toBe(5);

});