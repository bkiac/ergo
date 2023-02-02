# gotscha

Go-like error handling implemented for TypeScript

[TypeScript >=v4.6
is required to use control flow analysis for destructured discriminated unions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-6.html#control-flow-analysis-for-destructured-discriminated-unions)

If you prefer to use Rust's `Result` check out [oxide.ts](https://github.com/traverse1984/oxide.ts)

## Documentation

### Import

```ts
import {g} from "gotscha"
// or import * as gotscha from "gotscha"
// or import {gotscha} from "gotscha"
```

### Methods

Use result type with `ok` and `err` convenience methods

```ts
function foo(v: number): g.Result<number> {
	return v % 2 ? g.ok(v) : g.err(new Error("odd number"))
}

const [error, value] = foo()
if (!error) {
	const v = value // `v` is number
}
```

Execute an existing function with `exec` to get a result tuple

```ts
function foo(): number {
	const r = Math.random()
	if (r < 0.5) {
		throw Error("error")
	}
	return r
}
const [error, value] = g.exec(foo)
```

Wrap an existing function then call the returned function to get a result tuple

```ts
const foo = (arg1: number, arg2: string) => {...}
const bar = g.wrap(foo)
const [error, value] = bar(0, "1") // Wrapped function keeps function signature
```

### Panic

Throw panic instead of error if something is really wrong

```ts
function foo(): number {
	const r = Math.random()
	if (r < 0.5) {
		throw new g.Panic("too low")
	}
	return r
}
const [error, value] = g.exec(foo) // Will throw error
```

Use `recover` option to recover from panics

```ts
function foo(): number {
	const r = Math.random()
	if (r < 0.5) {
		throw new g.Panic()
	}
	return r
}
const [error, value] = g.exec(foo, {
	recover: true, // `false` by default
})
console.log(error instanceof g.Panic) // true
```

Use `panicOn` option to specify error instances that should be seen as panic

```ts
g.exec(fn, {
	panicOn: [TypeError], // If `fn` throws `TypeError`, `exec` will rethrow it
})
```

Use `preprocess` option to process errors

```ts
g.exec(fn, {
	preprocess: (error: unknown) => {
		if (error instanceof IOError) {
			return new Panic(error.message)
		}
		if (error instanceof Error) {
			return error
		}
		return new Error("unknown error")
	},
})
```

### Create instance with default options

```ts
import {create} from "gotscha"

const g = create({panicOn: [TypeError]})
```
