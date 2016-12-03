/*globals require describe it*/

let chai = require("chai");
let expect = chai.expect;

describe("Test environment", () => {
    it("Expect to pass", () => {
        expect(1).to.equal(1);
    });

    it("Expect to fail", () => {
        expect(1).to.equal(2);
    })
})