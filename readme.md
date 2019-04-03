<p align="center">
  <img width="220" alt="Logo with caption: proper error object" src="docs/cover.png">
</p>
<p align="center">
  <a href="https://npmjs.com/package/error3">
    <img alt="badge: npm version" src="https://img.shields.io/npm/v/error3.svg?style=flat-square" />
  </a>
  <a href="https://npmjs.com/package/error3">
    <img alt="badge: npm downloads" src="https://img.shields.io/npm/dw/error3.svg?style=flat-square" />
  </a>
  <img alt="badge: size 0.9 KiB" src="https://img.shields.io/badge/size-0.9%20KiB-blue.svg?style=flat-square" />
  <img alt="badge: deps 0" src="https://img.shields.io/badge/deps-0-blue.svg?style=flat-square" />
  <a aria-label="build status" href="https://travis-ci.org/rumkin/error3">
    <img alt="badge" src="https://img.shields.io/travis/rumkin/error3.svg?style=flat-square" />
  </a>
</p>

Error3 is an Error with extra powers. It has been designed to be extensible and easy to use.
Though it has codes, message formatters and nested errors.

* Modern: designed for TypeScript and ES2019.
* IDE friendly: it's using classes and class fields to be inspectable for autosuggetion tools.
* i18n ready: formatter could produce localized messages with help of [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
* Easy serialization and deserealization: good for network apps and JSON logging.
* Frontend caring: 0 dependencies, gzipped version is less then 1 KiB.

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Examples](#examples)
* [API](#api)

## Install

* In node.js:
  ```bash
  npm i error3
  ```
* In browser:
  ```html
  <script src="https://unpkg.com/error3@3/dist/error3.min.js"></script>
  ```
  [CommonJS](https://unpkg.com/error3@3/dist/commonjs/) ·
  [UMD](https://unpkg.com/error3@3/dist/) ·
  [ESM](https://unpkg.com/error3@3/dist/esm/)
  > ⚠️ Remember about security! Add [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) (SRI) checksum
  > from [checksum.txt](https://unpkg.com/error3@3/dist/checksum.txt).

## Usage

Error3 suppose that you will create some base error class for your application
or library and then use it as a parent for all your errors. Watch example in
[examples](examples) folder. Here it is interface realization:

```javascript
import Error3 from 'error3'

class NotFoundErr extends Error3 {
  code = 'fs_not_found'

  format({ filepath }) {
    return `File "${filepath}" not found`
  }
}
```

This is what it gives to us:

```javascript
const error = new NotFoundErr({ filepath: './index.js' });

error.toString() // -> "NotFoundErr: [#fs_not_found] File "./index.js" not found"
error.message // -> "File "./index.js" not found"
error.code // -> fs_not_found
error.details // -> {filepath: './index.js'}
```

The same error TypeScript implementation:

```typescript
import Error3 from 'error3'

class NotFoundErr extends Error3<{ filepath: string }, void> {
  code = 'fs_not_found'

  format({ filepath }): string {
    return `File "${filepath}" not found`
  }
}
```

### JSON serialization

Calling [`Error3#toJSON()`](#error3tojson) on Error3 instance returns an object with properties
`code`, `message`, `details`, and `errors`. Example output:

```json
{
  "code": "fs_not_found",
  "message": "File \"./index.js\" not found",
  "details": {
    "filepath": "./index.js"
  },
  "errors": []
}
```

## Examples

* HTTP errors [JS](examples/http-errors.js) · [TS](examples/http-errors.js)
* FileSystem errors [JS](examples/fs-errors.js) · [TS](examples/fs-errors.js)
* Localized i18n error messages [JS](examples/intl.js) · [TS](examples/intl.js)

## API

### `Error3()`

```text
(details: object={}, errors: Error[]=[]) -> Error3
```

__abstract__. Both of Error3 constructor arguments are optional. The resposibility of
ancestor class is to implement proper interface and pass `details` object
and `errors` list into `super()` call. 

`details` is using to describe error with JS primitives. Though it could be sent
via network to frontend, db, or ELK without extra parsing as it should be done
with regular Error instance.

#### TS Interface

```typescript
abstract class Error3<Details, Errors> extends Error implements IError3 {
  public readonly code: string|number
  public readonly name: string
  public readonly details: object
  public readonly errors: Error[]

  constructor(details: Details, errors: Errors) {}
  abstract format(detials: Details, errors: Errors): string
}
```

#### Example

```javascript
const error = new UserMissed(
  {userId: 1}, [new Error('Collection removed')]
);

error.code // -> user_missed
error.message // -> User #1 not loaded
error.details // -> {userId: 1}
error.errors // -> [Error('Collection removed')]
```

### `Error#code`
```
string|number
```

Error code should be a string or a number. It could be defined using class fields
syntax:

```javascript
class HttpNotFound extends HttpError {
  code = 404
}
```

### `Error3#format()`
```
(details: object, errors: Error[]) -> string
```

__abstract__. Creates formatted message string from details and other errors.
This method is calling from Error3 constrcutor to define `message` property.

#### JS
```javascript
class PortInUse extends Error3 {
  format({ port }) {
    return `Port ${port} is already in use`
  }
}
```

#### TS
```typescript
class PortInUse extends Error3<{ port: string|number }, void> {
  format({ port }): string {
    return `Port ${port} is already in use`
  }
}
```

### `Error3#toJSON()`

Wrapper of [`Error3#valueOf`](#error3valueof). It's created to be used by `JSON.stringify()`.

### `Error3#valueOf()`
```
() -> PlainError
```

This method realizes [`Object#valueOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) behavior and returns plain error object containing properties:
`code`, `message`, `details` and `errors`.

### `PlainError{}`
```
{
  code: string|number,
  message: string,
  details: object,
  errors: PlainError[],
}
```

It is a result of `Error3#valueOf()` call.

## License

MIT © [Rumkin](https://rumk.in)
