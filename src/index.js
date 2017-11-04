'use strict';

class Error3 extends Error {
    constructor(code, ...args) {
        let message;
        let details;
        let errors;

        let gotMessage = false;
        let gotDetails = false;
        let gotErrors = false;

        const length = Math.min(args.length, 3);

        for (let i = 0; i < length; i++) {
            const arg = args[i];

            if (gotMessage && gotErrors && gotDetails) {
                break;
            }

            if (typeof arg === 'string') {
                if (gotMessage) {
                    break;
                }

                // This is a message
                message = arg;
                gotMessage = true;
            }
            else if (Array.isArray(arg)) {
                if (gotErrors) {
                    break;
                }

                errors = arg.slice();
                gotErrors = true;
                gotMessage = true;
                gotDetails = true;
            }
            else if (arg instanceof Error) {
                if (gotErrors) {
                    break;
                }

                errors = [arg];
                gotErrors = true;
                gotMessage = true;
                gotDetails = true;
            }
            else if (arg && arg instanceof Object){
                if (gotDetails) {
                    break;
                }

                details = arg;
                gotDetails = true;
                gotMessage = true;
            }
            else if (arg !== null) {
                break;
            }
        }

        super();

        this.name = this.constructor.name;
        this.code = code;


        if (! message) {
            const CODE = code.toUpperCase();
            if (this.constructor[CODE]) {
                this.message = this.constructor[CODE](details);
            }
            else {
                this.message = code.replace(/_/g, ' ');
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

    static from(value) {
        const errors = value.errors
        ? value.errors.map(this.fromJSON.bind(this))
        : [];

        return new this(value.code, value.message, value.details || {}, errors);
    }

    static fromJSON(...args) {
        console.error('Deprecated method fromJSON use from instead.');
        return this.from(...args);
    }
}

module.exports = Error3;
