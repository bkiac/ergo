import {describe, expect, it} from "vitest"
import {Panic} from "./panic"

describe("panic", () => {
	it("should work with message", () => {
		const msg = "panicking"
		const panic = new Panic(msg)

		expect(panic).toBeInstanceOf(Error)
		expect(panic).toBeInstanceOf(Panic)

		expect(panic.name).toEqual("Panic")
		expect(panic.message).toEqual(msg)
		expect(panic.stack).not.toBeUndefined()
	})

	it("should wrap error", () => {
		const error = new Error("message")
		const panic = new Panic(error)

		expect(panic).toBeInstanceOf(Error)
		expect(panic).toBeInstanceOf(Panic)

		expect(panic.name).toContain("Panic")
		expect(panic.name).toContain(error.name)

		expect(panic.message).toEqual(error.message)
		expect(panic.stack).toEqual(error.stack)
	})
})
