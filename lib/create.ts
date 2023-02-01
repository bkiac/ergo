import {ok, err} from "./core"
import {exec, execAsync} from "./exec"
import type {ErrorHandlerOptions} from "./handle_error"
import {resolve} from "./resolve"
import {wrap, wrapAsync} from "./wrap"

export function create(defaultOptions?: ErrorHandlerOptions): {
	ok: typeof ok
	err: typeof err
	resolve: typeof resolve
	exec: typeof exec
	execAsync: typeof execAsync
	wrap: typeof wrap
	wrapAsync: typeof wrapAsync
} {
	return {
		ok,
		err,
		resolve,
		exec: (fn, options) => exec(fn, {...defaultOptions, ...options}),
		execAsync: (fn, options) => execAsync(fn, {...defaultOptions, ...options}),
		wrap: (fn, options) => wrap(fn, {...defaultOptions, ...options}),
		wrapAsync: (fn, options) => wrapAsync(fn, {...defaultOptions, ...options}),
	}
}
