export type Ok<V> = readonly [undefined, V]
export function ok(value?: undefined): Ok<undefined>
export function ok<V>(value: V): Ok<V>
export function ok<V>(value: V): Ok<V> {
	return [undefined, value] as const
}

export type Err<E extends Error = Error> = readonly [E, undefined]
export function err<E extends Error = Error>(error: E): Err<E>
export function err(error: string): Err<Error>
export function err(error: Error | string): Err<Error> {
	return [error instanceof Error ? error : new Error(error), undefined] as const
}

export type Result<V, E extends Error = Error> = Ok<V> | Err<E>
