# Error3

Error3 is an extended JS error. It designed to be simply serializable to be
used in API. It supports code and unified json convertation.

## API

### Error3(code:string[, message:string][, details:object])

Error object constructor has only one required argument `code` it should be
string separated with underscores in lower case. Other two are optional. Message
as a string and error details as an object. If message is not presented then
it will be created from code. Details are cloned with native object assigning.

```javascript
let error = new Error3('not_found');
error.code // -> not_found
error.message // -> Not found
error.details // -> {}

let error2 = new Error3('not_found', 'File not found', {path: './index.js'});
error2.code // -> not_found
error2.message // -> File not found
error2.details // -> {path: './index.js'}
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

(new Error3('test')).toString(); // -> 'Error3: Test';
(new MyError('test')).toString(); // -> 'MyError: Test';

```

## License 

MIT.

