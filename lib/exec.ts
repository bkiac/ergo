import {type Result, ok} from "./core"
import {type ErrorHandlerOptions, handleError} from "./handle_error"
import {resolve} from "./resolve"

export function exec<V>(fn: () => V, options?: ErrorHandlerOptions): Result<V> {
	try {
		return ok(fn())
	} catch (e: unknown) {
		return handleError(e, options)
	}
}

export async function execAsync<V>(fn: () => Promise<V>, options?: ErrorHandlerOptions): Promise<Result<V>> {
	return resolve(fn(), options)
}
