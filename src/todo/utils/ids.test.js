import { nanoid, uuid, uuidSvelte } from "./ids.js";

describe("ids", () => {
    describe("nanoid", () => {
        it("should return a string", () => {
           expect(nanoid()).toHaveLength(21);
        });
    });

    describe("uuid", () => {
        it("should return a string", () => {
           expect(uuid()).toHaveLength(36);
        });
    });

    describe("uuidSvelte", () => {
        it("should return a string", () => {
           expect(uuidSvelte()).toHaveLength(36);
        });
    });
});
