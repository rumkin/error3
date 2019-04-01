// export = Error3

export default abstract class Error3<Details, Errors> extends Error {
  public code: string
  public details: object
  public errors: Error|Error[]

  constructor(details: Details, errors: Errors) {
    super('')

    this.code = toUnderscore(this.constructor.name)
    this.name = this.constructor.name

    if (details) {
      if (isObject(details) && isPlainObject(details)) {
        this.details = {...details as Object}
      }
      else {
        throw new Error('Details should be an Object or undefined')
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
      errors: this.errors,
    }
  }

  toString() {
    return this.name + ': ' + this.message
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

function toUnderscore(str: string): string {
  return str[0].toLowerCase() + str.slice(1)
  .replace(/[A-Z]+/, (v) => '_' + v.toLowerCase())
}
