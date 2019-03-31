const functions = require("../functions");

test("adds 2 and 2 to be 4", ()=>{
    expect(functions.add(2,2).toBe(4));
});