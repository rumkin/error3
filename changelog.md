# CHANGELOG

### 2.0.0

* Error3 rewriten to TypeScript.
* No static message generation methods. Custom constructors with `format` method are using now:
  ```javascript
  class MyError extends Error3 {
    format(details) {
      return 'Custom error message based on ' + details.property
    }
  }
```
* Interface simplified. Now library errors file could look like so:
  ```javascript
  export default class MyErrGroup extends Error3 {}

  export class MyParticularError1 extends MyErrGroup { /* error implementation */ }
  export class MyParticularError2 extends MyErrGroup { /* error implementation */ }
  // etc...
  ```
* No more manual message creation. All errors should be specified and has it's own class.

### 1.7.0

* Add errors to code stringification method:
    ```javascript
    Error3.CODE = function(details, errors) {
        //...
    };
    ```
* Update positional arguments handling. Now wrong arguments will throw.
* Add `toString` method to provide code into error string:
    ```javascript
    String(new Error3('not_found', 'Nothing found'));
    // > "Error3: [#not_found] Nothing found"
    ```
* Fix static method `from` to prevent of using deprecated method `fromJSON`.
* Enhance documentation.
