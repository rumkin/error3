export default abstract class Error3<Details, Errors> extends Error {
  public code: string|number = 0
  public name: string = this.constructor.name
  public details: object
  public errors: Error[]

  constructor(details: Details, errors: Errors) {
    super('')

    if (details) {
      if (isObject(details) && isPlainObject(details)) {
        this.details = {...details as Object}
      }
      else {
        throw new Error('Details should be a plain Object instance or undefined')
      }
    }
    else {
      this.details = {}
    }

    if (errors) {
      if (isErrors(errors)) {
        this.errors = errors
      }
      else {
        throw new Error('Errors should be an array of errors')
      }
    }
    else {
      this.errors = []
    }

    this.message = this.format(details, errors)
  }

  abstract format(_details: Details, _errors: Errors): string

  valueOf() {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      errors: this.errors.map((error) => error.valueOf()),
    }
  }

  toString() {
    const {name, code, message} = this
    return `${name}: [#${code}] ${message}`
  }

  toJSON() {
    return this.valueOf()
  }
}

function isErrors(value: any): value is Error[] {
  return (Array.isArray(value) && value.every((item) => isErrorObject(item)))
}

function isObject(value: any): value is Object {
  return value !== null && typeof value === 'object'
}

function isErrorObject(value:any): value is Error {
  return isObject(value) && value instanceof Error
}

function isPlainObject(value:any):value is Object {
  return value.constructor.toString() === Object.toString()
}
