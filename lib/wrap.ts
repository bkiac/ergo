import type {ErrorHandlerOptions} from "./handle_error"
import {exec, execAsync} from "./exec"
import type {Result} from "./core"

type Fn = (...args: any[]) => any
type AsyncFn = (...args: any[]) => Promise<any>

export function wrap<F extends Fn>(
	fn: F,
	options?: ErrorHandlerOptions,
): (...args: Parameters<F>) => Result<ReturnType<F>> {
	return (...args) => exec(() => fn(...args), options)
}

export function wrapAsync<F extends AsyncFn>(
	fn: F,
	options?: ErrorHandlerOptions,
): (...args: Parameters<F>) => Promise<Result<Awaited<ReturnType<F>>>> {
	return (...args) => execAsync(() => fn(...args), options)
}
