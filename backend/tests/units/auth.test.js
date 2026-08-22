import { describe, it, expect } from "vitest";

describe("Example test", () => {
    it("should pass", () => {
        expect(1 + 1).toBe(2);
    });
});

describe("Auth Testing", () => {
    it("generates a token", () => {
        const user = {
            id: 1,
            email: "test@test.com",
            name: "Alan",
            role: 1,
        };
    });
});
