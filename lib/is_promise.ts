export const isPromise = <V>(value: V | Promise<V>): value is Promise<V> =>
	value instanceof Promise || Object.prototype.toString.call(value) === "[object Promise]"
