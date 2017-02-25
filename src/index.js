'use strict';

class Error3 extends Error {
    constructor(code, message, details) {
        super(message);
        
        if (typeof message === 'object') {
            details = message;
            message = null;
        }
        
        if (! message) {
            message = code.replace(/_/g, ' ');
        }
        
        this.name = this.constructor.name;
        this.code = code;
        this.message = message;
        this.details = Object.assign({}, details);
    }
    
    valueOf() {
        return {
            code: this.code,
            message: this.message,
            details: this.details,
        };
    }
    
    toJSON() {
        return this.valueOf();
    }
}

module.exports = Error3;