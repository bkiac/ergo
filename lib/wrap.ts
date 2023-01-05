import type {ErrorHandlerOptions} from "./handle_error"
import {exec, execAsync, execSync} from "./exec"
import type {Result} from "./core"

type Fn = (...args: any[]) => any
type AsyncFn = (...args: any[]) => Promise<any>

// @ts-expect-error TypeScript should be able to infer the type of the returned function
export function wrap<F extends (...args: any[]) => never, E extends Error = Error>(
	fn: F,
	options?: ErrorHandlerOptions<E>,
): (...args: Parameters<F>) => Result<never, E>

export function wrap<F extends AsyncFn, E extends Error = Error>(
	fn: F,
	options?: ErrorHandlerOptions<E>,
): (...args: Parameters<F>) => Promise<Result<Awaited<ReturnType<F>>, E>>

export function wrap<F extends Fn, E extends Error = Error>(
	fn: F,
	options?: ErrorHandlerOptions<E>,
): (...args: Parameters<F>) => Result<ReturnType<F>, E>

export function wrap<F extends Fn, E extends Error = Error>(fn: F, options?: ErrorHandlerOptions<E>) {
	return (...args: Parameters<F>) => exec(() => fn(...args), options)
}

export function wrapSync<F extends Fn, E extends Error = Error>(fn: F, options?: ErrorHandlerOptions<E>) {
	return (...args: Parameters<F>): Result<ReturnType<F>> => execSync(() => fn(...args), options)
}

export function wrapAsync<F extends AsyncFn, E extends Error = Error>(fn: F, options?: ErrorHandlerOptions<E>) {
	return async (...args: Parameters<F>): Promise<Result<Awaited<ReturnType<F>>>> =>
		execAsync(async () => fn(...args), options)
}
