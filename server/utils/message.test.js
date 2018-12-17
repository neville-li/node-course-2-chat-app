const {expect} = require("chai");

var {generateMessage} = require("./message");


describe("generateMessage", () => {
    it("should generate correct message object", () => {
        var from = "Jen";
        var text = "Some message";
        var message = generateMessage(from, text);

        expect(message.createdAt).to.be.a("number");
        expect(message).to.include({from, text});
    });
});