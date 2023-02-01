import {describe, expect, it} from "vitest"
import {ok, err} from "./core"

describe("core", () => {
	it("should return value", () => {
		const value = 1
		const [e, v] = ok(value)
		expect(v).toEqual(value)
		expect(e).toBeUndefined()
	})

	it("should return undefined if empty", () => {
		const [e, v] = ok()
		expect(v).toBeUndefined()
		expect(e).toBeUndefined()
	})

	it("should return error", () => {
		const error = new Error("message")
		const [e, v] = err(error)
		expect(v).toBeUndefined()
		expect(e).toBeInstanceOf(Error)
		expect(e.message).toEqual(error.message)
	})

	it("should return custom error", () => {
		class CustomError extends Error {}
		const error = new CustomError("custom message")
		const [e, v] = err(error)
		expect(v).toBeUndefined()
		expect(e).toBeInstanceOf(CustomError)
		expect(e.message).toEqual(error.message)
	})

	it("should return error with same message as arg string", () => {
		const m = "message"
		const [e, v] = err(m)
		expect(v).toBeUndefined()
		expect(e).toBeInstanceOf(Error)
		expect(e.message).toEqual(m)
	})
})
