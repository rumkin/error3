# CHANGELOG

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
