
test("initialize ViewModel", () => {
});


test('comp225', () => {
    expect(makeConnectionsModule.makeConnections("COMP225")).toMatchObject(
        [
            { source: "COMP124", target: "COMP225" },
            { source: "COMP123", target: "COMP124" }
        ]
    );
});