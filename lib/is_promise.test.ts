import {describe, expect, it} from "vitest"
import {isPromise} from "./is_promise"

describe("isPromise", () => {
	it("should return true for promise", () => {
		expect(isPromise(new Promise(() => {}))).toEqual(true)
	})

	it("should return false for non-promise", () => {
		;[0, "", true, null, undefined, Symbol(), [], {}].forEach((value) => {
			expect(isPromise(value)).toEqual(false)
		})
	})
})
