import {describe, it, expect} from "vitest"
import {Panic} from "./panic"
import {resolve} from "./resolve"

describe("resolve", () => {
	it("should return value", async () => {
		const value = 1
		const [v, e] = await resolve(Promise.resolve(value))
		expect(v).toBe(value)
		expect(e).toBeUndefined()
	})

	it("should return undefined for void", async () => {
		const [v, e] = await resolve(Promise.resolve())
		expect(v).toBeUndefined()
		expect(e).toBeUndefined()
	})

	it("should return error", async () => {
		const error = new Error("message")
		const [v, e] = await resolve(Promise.reject(error))
		expect(v).toBeUndefined()
		if (e) {
			expect(e).toBeInstanceOf(Error)
			expect(e.message).toEqual(error.message)
		}
	})

	it("should panic", async () => {
		const panic = new Panic("message")
		expect(() => resolve(Promise.reject(panic))).rejects.toThrowError(panic.message)
	})
})
