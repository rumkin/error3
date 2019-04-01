import * as should from 'should'
import Error3  from '../src/'

type MyErrorDetails = {
  value: string
}

class MyError extends Error3<MyErrorDetails, Error[]|void> {
  format({value}) {
    return `is: ${value}`
  }
}

describe('Error3', function() {
  describe('constructor', function() {
    it('Should instantiate with details', () => {
      const error = new MyError({value: 'error'})

      should(error).hasOwnProperty('details')
      .which.is.an.Object()

      should(error.details).be.deepEqual({value: 'error'})

      should(error.errors).has.lengthOf(0)
    })

    it('Should create proper message from details', () => {
      const error = new MyError({value: 'error'})

      should(error).hasOwnProperty('message')
      .which.is.a.String()

      should(error.message).be.equal('is: error')
      should(error.toString()).be.equal('MyError: is: error')
    })

    it('Should transform constructor name to code', () => {
      const error = new MyError({value: 'error'})

      should(error).hasOwnProperty('code')

      should(error.code).be.equal('my_error')
    })

    it('Should create empty .errors property', () => {
      const error = new MyError({value: 'error'})

      should(error).hasOwnProperty('errors')
      .which.is.an.Array()

      should(error.errors).has.lengthOf(0)
    })

    it('Should instantiate with details and errors', () => {
      const error = new MyError({value: 'all'}, [new Error('test')])
      should(error).hasOwnProperty('code')
      should(error).hasOwnProperty('message')
      should(error).hasOwnProperty('details')
      should(error).hasOwnProperty('errors')

      should(error.code).be.equal('my_error')
      should(error.message).be.equal('is: all')
      should(error.toString()).be.equal('MyError: is: all')
      should(error.details).be.deepEqual({value: 'all'})

      should(error.errors).has.lengthOf(1)
      should(error.errors[0]).be.instanceOf(Error)
      should(error.errors[0].message).be.equal('test')
    })
  })
})
