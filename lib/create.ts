import {exec, execAsync} from "./exec"
import type {ErrorHandlerOptions} from "./handle_error"
import {wrap, wrapAsync} from "./wrap"

export function create(defaultOptions?: ErrorHandlerOptions): {
	exec: typeof exec
	execAsync: typeof execAsync
	wrap: typeof wrap
	wrapAsync: typeof wrapAsync
} {
	return {
		exec: (fn, options) => exec(fn, {...defaultOptions, ...options}),
		execAsync: (fn, options) => execAsync(fn, {...defaultOptions, ...options}),
		wrap: (fn, options) => wrap(fn, {...defaultOptions, ...options}),
		wrapAsync: (fn, options) => wrapAsync(fn, {...defaultOptions, ...options}),
	}
}
