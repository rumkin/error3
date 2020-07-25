export interface IError3 extends Error {
  readonly code: string|number
  readonly details: object
}

export interface IAggregateError3 extends IError3 {
  readonly errors: Error[]
}

type PlainError = {
  code: string|number
  message: string
  details: object
  errors?: Array<PlainError|Object>
}

function getDetails<Details>(details: Details): Object {
  if (details) {
    if (isObject(details) && isPlainObject(details)) {
      return {...details as Object}
    }
    else {
      throw new Error('Details should be a plain Object instance or undefined')
    }
  }
  else {
    return {}
  }
}

function getErrors<Errors>(errors: Errors): Error[] {
  if (errors) {
    if (isErrors(errors)) {
      return errors
    }
    else {
      throw new Error('Errors should be an array of errors')
    }
  }
  else {
    return []
  }
}

function stringifyError(error: IError3|IAggregateError3): string {
  const {name, code, message} = error
  return `${name}: [#${code}] ${message}`
}

export abstract class Error3<Details> extends Error implements IError3 {
  public readonly code: string|number = 0
  public readonly name: string = this.constructor.name
  public readonly details: object

  constructor(details: Details) {
    super()

    this.details = getDetails<Details>(details)

    this.message = this.format(details)
  }

  abstract format(_details: Details): string

  valueOf(): PlainError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    }
  }

  toString(): string {
    return stringifyError(this)
  }

  toJSON(): PlainError {
    return this.valueOf()
  }
}

export abstract class AggreagateError3<Details, Errors> extends AggregateError implements IError3 {
  public readonly code: string|number = 0
  public readonly name: string = this.constructor.name
  public readonly details: object
  public readonly errors: Error[]

  constructor(details: Details, errors: Errors) {
    super([])

    this.details = getDetails<Details>(details)
    this.errors = getErrors<Errors>(errors)

    this.message = this.format(details, errors)
  }

  abstract format(_details: Details, _errors: Errors): string

  valueOf(): PlainError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      errors: this.errors.map((error) => error.valueOf()),
    }
  }

  toString(): string {
    return stringifyError(this)
  }

  toJSON(): PlainError {
    return this.valueOf()
  }
}

export abstract class TypeError3<Details> extends TypeError implements IError3 {
  public readonly code: string
  public readonly name: string = this.constructor.name
  public readonly details: object

  constructor(details: Details) {
    super()

    this.details = getDetails<Details>(details)

    this.message = this.format(details)
  }

  abstract format(_details: Details): string

  valueOf(): PlainError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    }
  }

  toString(): string {
    return stringifyError(this)
  }

  toJSON(): PlainError {
    return this.valueOf()
  }
}

export abstract class RangeError3<Details> extends RangeError implements IError3 {
  public readonly code: string
  public readonly name: string = this.constructor.name
  public readonly details: object

  constructor(details: Details) {
    super()

    this.details = getDetails<Details>(details)

    this.message = this.format(details)
  }

  abstract format(_details: Details): string

  valueOf(): PlainError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    }
  }

  toString(): string {
    return stringifyError(this)
  }

  toJSON(): PlainError {
    return this.valueOf()
  }
}

export abstract class SyntaxError3<Details> extends SyntaxError implements IError3 {
  public readonly code: string
  public readonly name: string = this.constructor.name
  public readonly details: object

  constructor(details: Details) {
    super()

    this.details = getDetails<Details>(details)

    this.message = this.format(details)
  }

  abstract format(_details: Details): string

  valueOf(): PlainError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    }
  }

  toString(): string {
    return stringifyError(this)
  }

  toJSON(): PlainError {
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
