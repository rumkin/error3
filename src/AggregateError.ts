abstract class AggregateError extends Error {
  readonly errors: Error[]

  constructor(errors: Error[], message?: string) {
    super(message)
    this.errors = errors
  }
}
