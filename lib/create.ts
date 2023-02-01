import {exec, execAsync} from "./exec"
import type {ErrorHandlerOptions} from "./handle_error"

export function create(defaultOptions?: ErrorHandlerOptions): {
	exec: typeof exec
	execAsync: typeof execAsync
} {
	return {
		exec: (fn, options) => exec(fn, {...defaultOptions, ...options}),
		execAsync: (fn, options) => execAsync(fn, {...defaultOptions, ...options}),
	}
}
