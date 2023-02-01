import {Err, err} from "./core"
import {Panic} from "./panic"

function defaultPreprocess(unknown: unknown, panicOn?: [ErrorConstructor, ...ErrorConstructor[]]): Error | Panic {
	if (!(unknown instanceof Error)) {
		return new Panic(`expected Error, got ${typeof unknown}`)
	}
	const shouldPanic = panicOn?.find((error) => unknown instanceof error)
	if (shouldPanic) {
		return new Panic(unknown)
	}
	return unknown
}

export type ErrorHandlerOptions = {
	/** Panic on any error instance from this array */
	panicOn?: [ErrorConstructor, ...ErrorConstructor[]]
	/** Recover panic, defaults to false */
	recover?: boolean
	/** Preprocess caught error to turn it into an Error or Panic */
	preprocess?: (unknown: unknown) => Error | Panic
}

export const handleError = (
	unknown: unknown,
	{panicOn, recover = false, preprocess = (unknown) => defaultPreprocess(unknown, panicOn)}: ErrorHandlerOptions = {},
): Err => {
	const error = preprocess(unknown)
	if (!recover && error instanceof Panic) {
		throw error
	}
	return err(error)
}
