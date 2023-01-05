import {describe, expect, it} from "vitest"
import {ok, err} from "./core"

class CustomError extends Error {}

describe("core", () => {
	it("should return value", () => {
		const value = 1
		const [v, e] = ok(value)
		expect(v).toEqual(value)
		expect(e).toBeUndefined()
	})

	it("should return error", () => {
		const error = new Error("message")
		const [v, e] = err(error)
		expect(v).toBeUndefined()
		expect(e).toBeInstanceOf(Error)
		expect(e.message).toEqual(error.message)
	})

	it("should return custom error", () => {
		const error = new CustomError("custom message")
		const [v, e] = err(error)
		expect(v).toBeUndefined()
		expect(e).toBeInstanceOf(CustomError)
		expect(e.message).toEqual(error.message)
	})

	it("should return error with same message as arg string", () => {
		const m = "message"
		const [v, e] = err(m)
		expect(v).toBeUndefined()
		expect(e).toBeInstanceOf(Error)
		expect(e.message).toEqual(m)
	})
})
