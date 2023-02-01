import {describe, expect, it} from "vitest"
import {wrap} from "./wrap"

describe("wrap", () => {
	it("should accept multiple args", () => {
		const arg1 = 1
		const arg2 = 2
		const fn = wrap((...args: number[]) => args.reduce((a, b) => a + b, 0))
		const [e, v] = fn(arg1, arg2)
		expect(v).toBe(arg1 + arg2)
		expect(e).toBeUndefined()
	})

	describe("sync", () => {
		it("should return value", () => {
			const value = 1
			const fn = wrap((arg: number) => arg)
			const [e, v] = fn(value)
			expect(v).toBe(value)
			expect(e).toBeUndefined()
		})

		it("should return error", () => {
			const error = new Error("message")
			const fn = wrap(() => {
				throw error
			})
			const [e, v] = fn()
			expect(v).toBeUndefined()
			if (e) {
				expect(e).toBeInstanceOf(Error)
				expect(e.message).toEqual(error.message)
			}
		})
	})

	describe("async", () => {
		it("should return value", async () => {
			const value = 1
			const fn = wrap(async (arg: number) => arg)
			const [e, v] = await fn(value)
			expect(v).toBe(value)
			expect(e).toBeUndefined()
		})

		it("should return error", async () => {
			const error = new Error("message")
			const fn = wrap(async () => {
				throw error
			})
			const [e, v] = await fn()
			expect(v).toBeUndefined()
			if (e) {
				expect(e).toBeInstanceOf(Error)
				expect(e.message).toEqual(error.message)
			}
		})
	})
})
