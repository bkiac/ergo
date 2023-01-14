export type Ok<V> = [V, undefined]
export type Err<E extends Error = Error> = [undefined, E]
export type Result<V, E extends Error = Error> = Ok<V> | Err<E>

export function ok(value?: undefined): Ok<undefined>
export function ok<V>(value: V): Ok<V>
export function ok<V>(value: V): Ok<V> {
	return [value, undefined]
}

export const err = <E extends Error>(error: E): Err<E> => [undefined, error]
