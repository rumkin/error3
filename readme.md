# Error3

[![npm](https://img.shields.io/npm/v/error3.svg?style=flat-square)](https://npmjs.com/packages/error3)
[![npm](https://img.shields.io/npm/dw/error3.svg?style=flat-square)](https://npmjs.com/packages/error3)
[![Travis](https://img.shields.io/travis/rumkin/error3.svg?style=flat-square)](https://travis-ci.org/rumkin/error3)

Error3 is regular JS Error with extra power. It's designed to be simply to be
used in API. It supports error codes, nested errors and conversion into JSON.

It has 3 in the name in the same reason as eventemitter3 npm package.

## Install

Install via NPM:

```bash
npm i error3
```

## Usage

Example of custom error creation.

```javascript
const Error = require('error3');

class FsError extends Error {
	static NOT_FOUND({path}) { // Method name is uppercased error code
        return `File or directory "${path}" not found`;
    }
}

throw new FsError('not_found', {path: '/some-file'});
// > "FsError: [#not_found] File or directory "/some-file" not found"
```

## API

### Error3(code:string[, message:string][, details:object][, errors:Error|Error[]])

Error object constructor has only one required argument `code` it should be
string separated with underscores in lower case. Other two are optional. Message
as a string and error details as an object. If message is not presented then
it will be created from code. Details are cloned with native object assigning.

```javascript
const error = new Error3('unknown_error');
error.code // -> unknown_error
error.message // -> Unknown error
error.details // -> {}
error.errors // -> []
```

Error could contain other error (or errors) caused current error throwing.
It could be single error instance or array of errors:

```javascript
const error = new Error3('unknown_error', 'User not loaded', {userId: 1}, new Error3('other_error'));
error.code // -> unknown_error
error.message // -> User not loaded
error.details // -> {userId: 1}
error.errors // -> [Error3('other_error')]
```

### toJSON() -> string

Stringification into JSON use `code`, `message` and `details` properties. Example:

```json
{
    "code": "not_found",
    "message": "File not found",
    "details": {
        "path": "./index.js"
    },
    "errors": []
}
```

## Message formatter methods

You can define custom message formatter for any code by creating uppercased
constructor's (static) method.

```text
(Object, Error[]) -> String
```

Example:

```javascript
Error3.FS_NOT_EXISTS = function({path}, errors) {
    return `File or directory "${path}" is not exists`;
};

const error = new Error3('fs_not_exists', {path: '/some/path'});

error.code; // -> 'fs_not_exists'
error.message; // -> 'File or directory "/some/path" not exists'
error.details; // -> {path: '/some/path'}
```

## Inheritance

Error3 is also designed to be simply extended. Note that constructor name will
be using as an error name:

```

Error3.TEST = () => ('This is test error');

class HttpError extends Error3 {}

String(new Error3('test')); // -> Error3: [#test] This is test error;
String(new HttpError('test')); // -> HttpError: [#test] This is test error;

```

## License

MIT.
