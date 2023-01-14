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

const [value, err] = foo()
if (!err) {
	const v = value // `v` is number
}
```

Execute an existing function with `exec` to get a result array

```ts
function bar(): number {
	return 1
}
const [value, err] = g.exec(bar)
```

Wrap an existing function, call the returned function to get a result array

```ts
const bazz = g.wrap(bar)
const [value, err] = bazz()
```

### Panic

Throw panic if something is really wrong

```ts
function listen(): g.Result<void> {
	if (Math.random() < 0.5) {
		throw new g.Panic("connection lost")
	}
	return g.ok(undefined)
}

// Panic instance won't be caught, `err` is always `undefined`
const [value, err] = listen()
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
