![Error3 Logo](docs/cover.png)

[![npm](https://img.shields.io/npm/v/error3.svg?style=flat-square)](https://npmjs.com/packages/error3)
[![npm](https://img.shields.io/npm/dw/error3.svg?style=flat-square)](https://npmjs.com/packages/error3)
![](https://img.shields.io/badge/size-0.9%20KiB-blue.svg?style=flat-square)
![](https://img.shields.io/badge/deps-0-blue.svg?style=flat-square)
[![Travis](https://img.shields.io/travis/rumkin/error3.svg?style=flat-square)](https://travis-ci.org/rumkin/error3)

Error3 is regular Error with extra power. It's designed to be extensible
and easy to use with typed systems. It supports error codes, message formatters
and nested errors. It's recomended to use instead of native Error to make
more robust APIs.

* Plays really good with TypeScript.
* Easy serialization/desearilization.
* Better logging and search.
* Tiny (less then a 1 KiB).

> It has 3 in the name in the same reason as [eventemitter3](https://npmjs.com/package/eventemitter3) npm package. Because there already was error2.

## Install

Install via NPM:

```bash
npm i error3
```

## Usage

Error3 suggests that you will create some base error class for your application.
And that will create an exhausive list of unique Error classes. But in this
example we will create just single error provided information about missing file.

### JS
```javascript
import Error3 from 'error3'

class NotFoundErr extends Error3 {
  format({filepath}) {
    return `File or directory "${filepath}" not found`
  }
}
// ... other errors

// Throwing
throw new NotFoundErr({filepath: '/some-file'});
// > "NotFoundErr: File or directory "/some-file" not found"
```

### TypeScript

```typescript
import Error3 from 'error3'

type NotFoundErrDetails = {
  filepath: string
}

class NotFoundErr extends Error3<NotFoundErrDetails, void> {
  format({filepath}):string {
    return `File or directory "${filepath}" not found`
  }
}

// Throwing
throw new NotFoundErr({filepath: '/some-file'});
// > "NotFoundErr: File or directory "/some-file" not found"
```

## API

How it works. Error3 uses constructor name as error code and
converts it from camelcase into underscore.

### `Error3()`

```text
(details:object = {}, errors:Error[] = []) -> Error3
```

__abstract__. Error3 constructor has no required arguments. This is resposibility of
ancestor class to implement proper interface into its constructor.

`details` is using to describe error with objects. Thus it could be sent via network
or stored in ELK without customized parsing with regexps.

```javascript
const error = new NotFound({filepath: 'index.js'});

error.code // -> file_not_found
error.message // -> File or directory "./index.js" not found
error.details // -> {filepath: 'index.js}
error.errors // -> []
```

Error could contain other error (or errors) caused current error throwing.
It could be single error instance or array of errors:

```javascript
const error = new UserMissed(
    {userId: 1}, new Error3('Collection removed')
);

error.code // -> user_missed
error.message // -> User #1 not loaded
error.details // -> {userId: 1}
error.errors // -> [Error('Collection removed')]
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
type ProtInUseDetails = {
  port: number
}

class PortInUse extends Error3<ProtInUseDetails, void> {
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
