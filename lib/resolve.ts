import {type Result, ok} from "./core"
import {type ErrorHandlerOptions, handleError} from "./handle_error"

export async function resolve<V>(value: Promise<V>, options?: ErrorHandlerOptions): Promise<Result<V>> {
	try {
		return ok(await value)
	} catch (e: unknown) {
		return handleError(e, options)
	}
}
