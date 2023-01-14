import type {MergeExclusive, Simplify} from "type-fest"
import {Err, err} from "./core"
import {Panic} from "./panic"

export type ErrorHandlerOptions<E extends Error> = Simplify<
	MergeExclusive<
		{
			/** Default to false */
			catchPanic?: boolean
			/** Preprocess caught error to turn it into an Error or Panic */
			preprocess?: (e: unknown) => Error | Panic
		},
		{
			/** Override error handling process, will disregard any other option */
			override: (e: unknown) => Err<E>
		}
	>
>

export const handleError = <E extends Error>(
	error: unknown,
	{override, catchPanic = false, preprocess}: ErrorHandlerOptions<E> = {},
): Err<E> => {
	if (override) {
		return override(error)
	}
	const e = preprocess ? preprocess(error) : error
	if (!catchPanic && e instanceof Panic) {
		throw e
	}
	if (!(e instanceof Error)) {
		throw new Panic(`expected error, got ${e}`)
	}
	return err(e as E)
}
