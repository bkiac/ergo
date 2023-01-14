import {type Result, ok} from "./core"
import {type ErrorHandlerOptions, handleError} from "./handle-error"

export async function resolve<E extends Error = Error>(
	value: Promise<void>,
	options?: ErrorHandlerOptions<E>,
): Promise<Result<undefined, E>>
export async function resolve<V, E extends Error = Error>(
	value: Promise<V>,
	options?: ErrorHandlerOptions<E>,
): Promise<Result<V, E>>
export async function resolve<V, E extends Error = Error>(
	value: Promise<V>,
	options?: ErrorHandlerOptions<E>,
): Promise<Result<V, E>> {
	return value.then((v) => ok(v)).catch((e: unknown) => handleError<E>(e, options))
}
