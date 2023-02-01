import {type Result, ok} from "./core"
import {type ErrorHandlerOptions, handleError} from "./handle_error"
import {isPromise} from "./is_promise"
import {resolve} from "./resolve"

export class Exec {
	constructor(private defaultOptions?: ErrorHandlerOptions) {}

	public exec<V extends Promise<any>>(fn: () => V, options?: ErrorHandlerOptions): Promise<Result<Awaited<V>>>
	public exec<V>(fn: () => V, options?: ErrorHandlerOptions): Result<V>
	public exec<V>(fn: () => V | Promise<V>, options?: ErrorHandlerOptions) {
		const o = {...this.defaultOptions, ...options}
		try {
			const v = fn()
			if (isPromise(v)) {
				return resolve<V>(v, o)
			}
			return ok(v)
		} catch (e: unknown) {
			return handleError(e, o)
		}
	}

	public execSync<V>(fn: () => V, options?: ErrorHandlerOptions): Result<V> {
		return exec(fn, options)
	}

	public execAsync<V>(fn: () => Promise<V>, options?: ErrorHandlerOptions): Promise<Result<V>> {
		return exec(fn, options)
	}
}

const singleton = new Exec()
export const exec = singleton.exec
export const execSync = singleton.execSync
export const execAsync = singleton.execAsync
