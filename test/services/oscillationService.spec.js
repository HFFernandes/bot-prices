
const service = require("../../src/services/oscillationService.js")

describe("oscillation service", () => {

    test("Should be negative", () => {
        return service.getPercentChange(29056.1648711554, 29044.5156561871).then(data => {
            expect(data).toBe(-0.0004009205970559564);
        });
    });

    test("Should be positive", () => {
        return service.getPercentChange(100, 150).then(data => {
            expect(data).toBe(0.5);
        });
    });
});

describe("oscillation Service - Price Direction", () => {

    test("Should be direction - down", () => {
        return service.getPriceDirection(-0.01, 0.001).then(data => {
            expect(data).toBe("down");
        });
    });

    test("Should be direction - up", () => {
        return service.getPriceDirection(0.00212, 0.001).then(data => {
            expect(data).toBe("up");
        });
    });

    test("Should be direction - NaN", () => {
        return service.getPriceDirection(0.000001, 0.001).then(data => {
            expect(data).toBe("NaN");
        });
    });

});