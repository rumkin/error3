<p align="center">
  <img width="220" alt="Logo with caption: proper error object" src="docs/cover.png">
</p>
<p align="center">
  <a href="https://npmjs.com/packages/error3">
    <img alt="badge: npm version" src="https://img.shields.io/npm/v/error3.svg?style=flat-square" />
  </a>
  <a href="https://npmjs.com/packages/error3">
    <img alt="badge: npm downloads" src="https://img.shields.io/npm/dw/error3.svg?style=flat-square" />
  </a>
  <img alt="badge: size 0.6 KiB" src="https://img.shields.io/badge/size-0.9%20KiB-blue.svg?style=flat-square" />
  <img alt="badge: badge: deps 0" src="https://img.shields.io/badge/deps-0-blue.svg?style=flat-square" />
  <a aria-label="build status" href="https://travis-ci.org/rumkin/error3">
    <img alt="badge" src="https://img.shields.io/travis/rumkin/error3.svg?style=flat-square" />
  </a>
</p>

Error3 is regular Error with extra power. It's designed to be extensible
and easy to use with typed systems. It supports error codes, message formatters
and nested errors. It's recomended to use instead of native Error to make
more robust APIs.

* Modern: designed for TypeScript and ES2019
* IDE friendly: no runtime execution  autosuggetions out of the box.
* Easy serialization and desearilization: good for network apps and JSON logging.
* Tiny (less then 1 KiB).

> It names error3 because error2 has already been taken.

## Install

* In node.js:

  ```bash
  npm i error3
  ```
* In browser:
  ```html
  <script src="https://unpkg.com/error3@3/dist/error3.min.js"></script>
  <!-- ES module -->
  <script src="https://unpkg.com/error3@3/dist/esm/error3.min.js"></script>
  ```
  > ⚠️ Remember about security! Add [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) (SRI) checksum
  > from [checksum.txt](https://unpkg.com/error3@3/dist/checksum.txt).

## Usage

Error3 suppose that you will create some base error class for your application
or library and then use it as a parent for all your errors. Watch example in
[examples](examples) folder. Ths is an example of interface realization:

```javascript
import Error3 from 'error3'

class NotFoundErr extends Error3 {
  code = 'not_found'

  format({filepath}) {
    return `File or directory "${filepath}" not found`
  }
}
// ... other errors

// Throwing
const error = new NotFoundErr({filepath: '/index.js'});
error.toString() // -> "NotFoundErr: [#not_found] File or directory "/index.js" not found"
error.message // -> "File or directory "/index.js" not found"
error.code // -> not_found
error.details // -> {filepath: '/index.js'}
```

The same in TypeScript:

```typescript
import Error3 from 'error3'

class NotFoundErr extends Error3<{filepath: string}, void> {
  code = 'not_found'

  format({filepath}):string {
    return `File "${filepath}" not found`
  }
}
```

## Examples

* HTTP errors ([JS](examples/http-errors.js), [TS](examples/http-errors.js))
* File System errors ([JS](examples/fs-errors.js), [TS](examples/fs-errors.js))

## API

How it works. Error3 uses constructor name as error code and
converts it from camelcase into underscore.

### `Error3()`

```text
(details:object = {}, errors:Error[] = []) -> Error3
```

__abstract__. Error3 constructor has only optional arguments. This is resposibility of
ancestor class to implement proper interface into its constructor. And pass `details`
object and `errors` list.

`details` is using to describe error with objects. Thus it could be sent via network
to frontend, db, or ELK without extra parsing with regexps.

```javascript
const error = new NotFound({filepath: 'index.js'});

error.code // -> not_found
error.message // -> File or directory "./index.js" not found
error.details // -> {filepath: 'index.js}
error.errors // -> []
```

Error could contain other error (or errors) caused current error throwing.
It could be array of errors:

```javascript
const error = new UserMissed(
    {userId: 1}, [new Error3('Collection removed')]
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
(details:object, errors: Error[]) -> string
```

__abstract__. Creates formatted message string from details and other errors.
This method is calling from Error3 constrcutor automatically.

#### JS
```javascript
class PortInUse extends Error3{
  format({port}) {
    return `Port ${port} is already in use`
  }
}
```

#### TS
```typescript
type PortInUseDetails = {
  port: number
}

class PortInUse extends Error3<PortInUseDetails, void> {
  format({port}:PortInUseDetails):string {
    return `Port ${port} is already in use`
  }
}
```

### `Error3#toJSON()`

```text
() -> Object
```

Stringification into JSON use `code`, `message` and `details` properties. Example:

```json
{
    "code": "file_not_found",
    "message": "File or directory 'index.js' not found",
    "details": {
        "filepath": "index.js"
    },
    "errors": []
}
```

## License

MIT.
