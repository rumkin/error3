type PlainObject = {
  constructor: ObjectConstructor,
}

type Data = Record<string|number,unknown>

export interface IError3 extends Error {
  readonly code: string|number
  readonly details: Data,
  readonly errors: Error[]
}

type PlainError = {
  code: string|number
  message: string
  details: Data
  errors: PlainError[]
}

export default abstract class Error3<Details, Errors> extends Error implements IError3 {
  public readonly code: string|number = 0
  public readonly name: string = this.constructor.name
  public readonly details: Data
  public readonly errors: Error[]

  constructor(details: Details, errors: Errors) {
    super()

    if (details) {
      if (isObject(details) && isPlainObject(details)) {
        this.details = {...details as Data}
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

  valueOf(): PlainError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      errors: this.errors.map((error) => error.valueOf() as PlainError),
    }
  }

  toString(): string {
    const {name, code, message} = this
    return `${name}: [#${code}] ${message}`
  }

  toJSON(): PlainError {
    return this.valueOf()
  }
}

function isErrors(value: unknown): value is Error[] {
  return (Array.isArray(value) && value.every((item) => isErrorObject(item)))
}

function isObject(value: unknown): value is Record<string,unknown> {
  return value !== null && typeof value === 'object'
}

function isErrorObject(value: unknown): value is Error {
  return isObject(value) && value instanceof Error
}

function isPlainObject(value: unknown): value is PlainObject {
  return value.constructor.toString() === Object.toString()
}
