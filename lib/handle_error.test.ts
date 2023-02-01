import {describe, expect, it} from "vitest"
import {handleError} from "./handle_error"
import {Panic} from "./panic"

describe("handleError", () => {
	const msg = "message"

	describe("preprocess", () => {
		it("should preprocess unknown into error", () => {
			const [error] = handleError(msg, {
				preprocess: (e) => new Error(e as string),
			})
			expect(error).toBeInstanceOf(Error)
			expect(error.message).toEqual(msg)
		})

		it("should handle panic", () => {
			expect(() =>
				handleError("not an error", {
					preprocess: () => new Panic(msg),
				}),
			).toThrowError(msg)
		})
	})

	describe("recover", () => {
		it("should throw on panic", () => {
			expect(() => handleError(new Panic(msg))).toThrowError(msg)
		})

		it("should not throw on panic with recover true", () => {
			const [error] = handleError(new Panic(msg), {recover: true})
			expect(error).toBeInstanceOf(Panic)
			expect(error.message).toBe(msg)
		})
	})

	describe("panicOn", () => {
		it("should throw if panicOn matches error", () => {
			expect(() => handleError(new TypeError(msg), {panicOn: [TypeError]})).toThrowError(msg)
		})

		it("should not throw on error with panicOn not matching", () => {
			const [error] = handleError(new Error(msg), {panicOn: [TypeError]})
			expect(error).toBeInstanceOf(Error)
			expect(error.message).toEqual(msg)
		})
	})

	it("should panic on invalid type without preprocess", () => {
		;[0, "", true, null, undefined, Symbol("symbol"), {}, []].forEach((invalid) => {
			expect(() => handleError(invalid)).toThrowError(typeof invalid)
		})
	})
})
