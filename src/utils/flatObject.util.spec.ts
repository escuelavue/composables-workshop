import { describe, it, expect } from "vitest"
import { flatObject } from "./flatObject.util"

describe("flatObject", () => {
    it("should flat a multi-level object", () => {
        const object = {
            a: {
                b: {
                    c: 1,
                },
            },
        };
        const result = flatObject(object);
        expect(result).toEqual({ c: 1 });
    })
})