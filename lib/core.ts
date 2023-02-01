export type Ok<V = undefined> = readonly [undefined, V]
export function ok(value?: undefined): Ok
export function ok<V>(value: V): Ok<V>
export function ok<V>(value: V): Ok<V> {
	return [undefined, value] as const
}

export type Err = readonly [Error, undefined]
export function err(error: Error | string): Err {
	return [error instanceof Error ? error : new Error(error), undefined] as const
}

export type Result<V = undefined> = Ok<V> | Err
