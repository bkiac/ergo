# gotscha

Go-like error handling implemented for TypeScript

[TypeScript >=v4.6
is required to use control flow analysis for destructured discriminated unions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-6.html#control-flow-analysis-for-destructured-discriminated-unions)

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
	return v % 2 ? g.ok(1) : g.err(new Error("odd number"))
}

const [value, error] = foo()
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
	return 1
}
const [value, error] = g.exec(foo)
```

Wrap an existing function then call the returned function to get a result tuple

```ts
const bar = g.wrap(foo)
const [value, error] = bar()
```

### Panic

Throw panic if something is really wrong

```ts
function foo(): g.Result<void> {
	if (Math.random() < 0.5) {
		throw new g.Panic()
	}
	return g.ok()
}

// Panic instance won't be caught, `error` is always `undefined`
const [value, error] = foo()
```

Use `catchPanic` option to customize panic handling

```ts
g.exec(fn, {
	catchPanic: true, // `false` by default
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

Use `override` option to completely override default error handling

```ts
g.exec(fn, {
	override: (error: unknown) => {
		if (error instanceof HTTPError) {
			// Won't be caught
			throw new Error(error.message)
		}
		return g.err()
	},
})
```
