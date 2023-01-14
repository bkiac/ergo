import {describe, expect, it} from "vitest"
import {err} from "./core"
import {handleError} from "./handle_error"
import {Panic} from "./panic"

class OverrideError extends Error {}

describe("handleError", () => {
	it("should use override", () => {
		const msg = "override error message"
		const [, error] = handleError(new Error("msg"), {
			override: () => err(new OverrideError(msg)),
		})
		expect(error).toBeInstanceOf(OverrideError)
		expect(error.message).toBe(msg)
	})

	describe("preprocess", () => {
		it("should preprocess unknown into error", () => {
			const msg = "message"
			const [, error] = handleError(msg, {
				preprocess: (e) => new Error(e as string),
			})
			expect(error).toBeInstanceOf(Error)
			expect(error.message).toBe(msg)
		})

		it("should handle panic", () => {
			const msg = "invalid type"
			expect(() =>
				handleError("not an error", {
					preprocess: () => new Panic(msg),
				}),
			).toThrowError(msg)
		})
	})

	describe("panic", () => {
		it("should throw on panic", () => {
			const msg = "panic"
			expect(() => handleError(new Panic(msg))).toThrowError(msg)
		})

		it("should not throw on panic with catchPanic true", () => {
			const msg = "panic"
			const [, error] = handleError(new Panic(msg), {catchPanic: true})
			expect(error).toBeInstanceOf(Panic)
			expect(error.message).toBe(msg)
		})
	})

	it("should panic on invalid type without preprocess", () => {
		const primitive = "invalid type" // Primitive
		expect(() => handleError(primitive)).toThrowError(primitive)
		const object = {} // Object
		expect(() => handleError(object)).toThrowError(object.toString())
	})
})
