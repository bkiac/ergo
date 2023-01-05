import {type Result, ok} from "./core"
import {type ErrorHandlerOptions, handleError} from "./handle_error"
import {isPromise} from "./is_promise"
import {resolve} from "./resolve"

export function exec<V extends Promise<any>, E extends Error = Error>(
	fn: () => V,
	options?: ErrorHandlerOptions<E>,
): Promise<Result<Awaited<V>, E>>

export function exec<V, E extends Error = Error>(fn: () => V, options?: ErrorHandlerOptions<E>): Result<V, E>

export function exec<V, E extends Error = Error>(fn: () => V | Promise<V>, options?: ErrorHandlerOptions<E>) {
	try {
		const v = fn()
		if (isPromise(v)) {
			return resolve<V, E>(v, options)
		}
		return ok(v)
	} catch (e: unknown) {
		return handleError<E>(e, options)
	}
}

export function execSync<V, E extends Error = Error>(fn: () => V, options?: ErrorHandlerOptions<E>): Result<V, E> {
	return exec(fn, options)
}

export async function execAsync<V, E extends Error = Error>(
	fn: () => Promise<V>,
	options?: ErrorHandlerOptions<E>,
): Promise<Result<V, E>> {
	return exec(fn, options)
}

export const call = exec
export const callSync = execSync
export const callAsync = execAsync
