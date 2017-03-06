# Error3

Error3 is an extended JS error. It designed to be simply serializable to be
used in API. It supports error codes, nested errors and unified convertion into json:

* Extandable.
* Serializable.
* API designed.

## API

### Error3(code:string[, message:string][, details:object][, errors:Error[]])

Error object constructor has only one required argument `code` it should be
string separated with underscores in lower case. Other two are optional. Message
as a string and error details as an object. If message is not presented then
it will be created from code. Details are cloned with native object assigning.

```javascript
let error = new Error3('not_possible');
error.code // -> not_possible
error.message // -> Not possible
error.details // -> {}
error.errors // -> []

let notFound = new Error3('not_found', 'File not found', {path: './index.js'}, [new Error3('test')]);
notFound.code // -> not_found
notFound.message // -> File not found
notFound.details // -> {path: './index.js'}
notFound.errors // -> [Error3('test')]
```

### toJSON() -> string

Stringification into JSON use `code`, `message` and `details` properties. Example:

```json
{
    "code": "not_found",
    "message": "File not found",
    "details": {
        "path": "./index.js"
    }
}
```

### Extension

Error3 is also designed to be simply extended. Note that constructor name will
be using as a error name:

```

class MyError extends Error3 {}

'' + new Error3('test'); // -> Error3: Test;
'' + new MyError('test'); // -> MyError: Test;

```

## License 

MIT.

