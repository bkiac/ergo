import {describe, expect, it} from "vitest"
import {Panic} from "./panic"

describe("panic", () => {
	it("should extend error and have the name panic", () => {
		const panic = new Panic("panic")
		expect(panic).toBeInstanceOf(Error)
		expect(panic).toBeInstanceOf(Panic)
		expect(panic.name).toBe("Panic")
	})
})
