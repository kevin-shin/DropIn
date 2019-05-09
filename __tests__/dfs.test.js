// import { dfs } from "../src/js/connectionsLogic.js";
const dfs = require("../src/js/connectionsLogic.js");

test('comp128', () => {
    expect(dfs("COMP128")).toMatchObject(
        ["COMP128", "COMP127", "COMP123"]
    );
});

test('comp225', () => {
    expect(dfs("COMP225")).toMatchObject(
        ["COMP225", "COMP127", "COMP123"]
    )
});

test('course with no prereqs', () => {
    expect(dfs("MATH279")).toMatchObject(
        ["MATH279"]
    )
});

test('course with prereqs across depts, requires flattening', () => {
    expect(dfs("MATH432")).toMatchObject(
        ["MATH432", "MATH312", "COMP120", "COMP123",
            "COMP128", "COMP127", "COMP123", "MATH236",
            "MATH237", "MATH137", "MATH135", "MATH279",
            "MATH137", "MATH135", "MATH135"]
    )
});

test('one prereq listed, which has a prereq', () => {
    expect(dfs("COMP128")).toMatchObject(
        ["COMP128", "COMP127", "COMP123"]
    )
});