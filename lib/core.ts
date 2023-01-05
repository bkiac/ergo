export type Ok<V> = [V, undefined]
export type Err<E extends Error = Error> = [undefined, E]
export type Result<V, E extends Error = Error> = Ok<V> | Err<E>

export const ok = <V>(value: V): Ok<V> => [value, undefined]

export function err<E extends Error = Error>(error: E): Err<E>
export function err(error: string): Err<Error>
export function err(error: Error | string): Err<Error> {
	return [undefined, error instanceof Error ? error : new Error(error)]
}

// export const err = <E extends string | Error>(error: E): Err<E> => [undefined, error]
