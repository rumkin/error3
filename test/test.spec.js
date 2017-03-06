'use strict';

const should = require('should');
const Error3 = require('..');

describe('Error3', function() {
    describe('constructor', function() {
        it('Should instantiate with code', () => {
            let error = new Error3('test_ok');
            should(error).hasOwnProperty('code');
            should(error).hasOwnProperty('message');
            should(error).hasOwnProperty('details');
            should(error).hasOwnProperty('errors');
            
            should(error.code).be.equal('test_ok');
            should(error.message).be.equal('test ok');
            should(error.details).be.deepEqual({});
            
            should(error.errors).has.lengthOf(0);
        });
        
        it('Should instantiate with code and errors', () => {
            let error = new Error3('test_ok', [new Error('test')]);
            should(error).hasOwnProperty('code');
            should(error).hasOwnProperty('message');
            should(error).hasOwnProperty('details');
            should(error).hasOwnProperty('errors');
            
            should(error.code).be.equal('test_ok');
            should(error.message).be.equal('test ok');
            should(error.details).be.deepEqual({});
            
            should(error.errors).has.lengthOf(1);
            should(error.errors[0]).be.instanceOf(Error);
        });
        
        it('Should instantiate with code, details and errors', () => {
            let error = new Error3('test_ok', {a: 1}, [new Error('test')]);
            should(error).hasOwnProperty('code');
            should(error).hasOwnProperty('message');
            should(error).hasOwnProperty('details');
            should(error).hasOwnProperty('errors');
            
            should(error.code).be.equal('test_ok');
            should(error.message).be.equal('test ok');
            should(error.details).be.deepEqual({a: 1});
            
            should(error.errors).has.lengthOf(1);
            should(error.errors[0]).be.instanceOf(Error);
        });
        
        it('Should instantiate with code, message and errors', () => {
            let error = new Error3('test_ok', 'test', [new Error('test')]);
            should(error).hasOwnProperty('code');
            should(error).hasOwnProperty('message');
            should(error).hasOwnProperty('details');
            should(error).hasOwnProperty('errors');
            
            should(error.code).be.equal('test_ok');
            should(error.message).be.equal('test');
            should(error.details).be.deepEqual({});
            
            should(error.errors).has.lengthOf(1);
            should(error.errors[0]).be.instanceOf(Error);
        });
        
        it('Should instantiate with code, message and details', () => {
            let error = new Error3('test_ok', 'test', {a: 1});
            should(error).hasOwnProperty('code');
            should(error).hasOwnProperty('message');
            should(error).hasOwnProperty('details');
            should(error).hasOwnProperty('errors');
            
            should(error.code).be.equal('test_ok');
            should(error.message).be.equal('test');
            should(error.details).be.deepEqual({a: 1});
            
            should(error.errors).has.lengthOf(0);
        });
        
        it('Should instantiate with code, message, details and errors', () => {
            let error = new Error3('test_ok', 'test', {a: 1}, [new Error('test')]);
            should(error).hasOwnProperty('code');
            should(error).hasOwnProperty('message');
            should(error).hasOwnProperty('details');
            should(error).hasOwnProperty('errors');
            
            should(error.code).be.equal('test_ok');
            should(error.message).be.equal('test');
            should(error.details).be.deepEqual({a: 1});
            
            should(error.errors).has.lengthOf(1);
            should(error.errors[0]).be.instanceOf(Error);
        });
    });
    
    it('Should specify error name for extensions', () => {
       class MyError extends Error3 {}
       
       let error = new MyError('test');
       should(error).hasOwnProperty('name', 'MyError');
    });
});
