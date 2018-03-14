class Error3 extends Error {
    constructor(code, ...args) {
        super();

        const {
            message = '',
            details = {},
            errors = [],
        } = extractArgs(args);

        this.name = this.constructor.name;
        this.code = code;

        if (! message.length) {
            const CODE = code.toUpperCase();

            if (this.constructor[CODE]) {
                this.message = this.constructor[CODE](details, errors);
            }
            else {
                this.message = code.charAt(0).toUpperCase()
                    + code.slice(1).replace(/_/g, ' ');
            }
        }
        else {
            this.message = message;
        }
        this.details = Object.assign({}, details);
        this.errors = errors || [];
    }

    valueOf() {
        return {
            code: this.code,
            message: this.message,
            details: this.details,
            errors: this.errors,
        };
    }

    toJSON() {
        return this.valueOf();
    }

    toString() {
        return this.constructor.name + ': [#' + this.code + '] ' + this.message;
    }

    static from(value) {
        const errors = value.errors
        ? value.errors.map(this.from.bind(this))
        : [];

        return new this(value.code, value.message, value.details || {}, errors);
    }

    static fromJSON(...args) {
        console.error('Deprecated method fromJSON use from instead.');
        return this.from(...args);
    }
}

/* eslint-disable max-statements */
function extractArgs(args) {
    if (args.length >= 3) {
        return {
            message: args[0],
            details: args[1],
            errors: args[2],
        };
    }

    let message;
    let details;
    let errors;

    const length = Math.min(args.length, 3);

    for (let i = 0; i < length; i++) {
        const arg = args[i];

        if (isError(arg)) {
            errors = [arg];
            break;
        }
        else if (isErrors(arg)) {
            errors = arg;
            break;
        }
        else if (i === 0) {
            if (typeof arg === 'string') {
                message = arg;
            }
            else if (isObject(arg) && isPlainObject(arg)) {
                details = arg;
            }
            else {
                throw new Error('Argument #1 should be a String or an Object');
            }
        }
        else if (i === 1) {
            if (isObject(arg) && isPlainObject(arg)) {
                details = arg;
            }
            else {
                throw new Error(
                    'Argument #2 should be an Object, an Error or Errors'
                );
            }
        }
        else {
            throw new Error('Argument should be an Error or Errors');
        }
    }

    return {
        errors,
        message,
        details,
    };
}

function isErrors(value) {
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i ++) {
            const item = value[i];

            if (! isObject(item) || ! isError(item)) {
                return false;
            }
        }
        return true;
    }

    return false;
}

function isObject(value) {
    return value !== null && typeof value === 'object';
}

function isError(value) {
    return value instanceof Error;
}

function isPlainObject(value) {
    return String(value.constructor) === String(Object);
}

/* eslint-enable max-statements */

module.exports = Error3;
