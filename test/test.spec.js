'use strict';

const should = require('should');
const Error3 = require('..');

describe('Error3', function() {
    it('Should be instanceof Error', function() {
        let error = new Error3('test');
        should(error).be.instanceOf(Error);
    });
    
    it('Should convert code to message', function() {
        let error = new Error3('test_error');
        should(error).has.ownProperty('message', 'test error');
    });
    
    it('Should has `details` property', function() {
        let error = new Error3('test_error', {a: 1});
        should(error).has.ownProperty('details', {a: 1});
    });
    
    it('Should instantiate without details', function() {
        let error = new Error3('test_error', 'Error');
        
        should(error).has.ownProperty('code', 'test_error');
        should(error).has.ownProperty('message', 'Error');
        should(error).has.ownProperty('details', {});
    });
    
    it('Should instantiate all properties', function() {
        let error = new Error3('test_error', 'Error', {a: 1});
        
        should(error).has.ownProperty('code', 'test_error');
        should(error).has.ownProperty('message', 'Error');
        should(error).has.ownProperty('details', {a: 1});
    });
    
    it('Should specify error name for extensions', () => {
       class MyError extends Error3 {}
       
       let error = new MyError('test');
       should(error).hasOwnProperty('name', 'MyError');
    });
});
