import {type Result, ok} from "./core"
import {type ErrorHandlerOptions, handleError} from "./handle_error"

export function exec<V>(fn: () => V, options?: ErrorHandlerOptions): Result<V> {
	try {
		return ok(fn())
	} catch (e: unknown) {
		return handleError(e, options)
	}
}

export async function execAsync<V extends Promise<any>>(
	fn: () => V,
	options?: ErrorHandlerOptions,
): Promise<Result<Awaited<V>>> {
	try {
		return ok(await fn())
	} catch (e: unknown) {
		return handleError(e, options)
	}
}
