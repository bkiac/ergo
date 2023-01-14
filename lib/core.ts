export type Ok<V> = [V, undefined]
export type Err<E extends Error = Error> = [undefined, E]
export type Result<V, E extends Error = Error> = Ok<V> | Err<E>

export function ok(value?: undefined): Ok<undefined>
export function ok<V>(value: V): Ok<V>
export function ok<V>(value: V): Ok<V> {
	return [value, undefined]
}

export function err<E extends Error = Error>(error: E): Err<E>
export function err(error: string): Err<Error>
export function err(error: Error | string): Err<Error> {
	return [undefined, error instanceof Error ? error : new Error(error)]
}
