import {describe, expect, it} from "vitest"
import {isPromise} from "./is_promise"

describe("isPromise", () => {
	it("should return true for promise", () => {
		expect(isPromise(new Promise(() => {}))).toBe(true)
	})

	it("should return false for non-promise", () => {
		expect(isPromise(0)).toBe(false)
		expect(isPromise("")).toBe(false)
		expect(isPromise(true)).toBe(false)
		expect(isPromise(null)).toBe(false)
		expect(isPromise(undefined)).toBe(false)
		expect(isPromise([])).toBe(false)
		expect(isPromise({})).toBe(false)
	})
})
