import Error3 from 'error3'

const formatters = {
  404: ({url}) => `Url "${url} not found`,
  500: (_, [error]) => `Internal server error: ${error.message}`
}

class HttpError extends Error3 {
  format(...args) {
    return formatters[this.code](...args)
  }
}

export class NotFound extends HttpError {
  code = 404
}

export class InternalError extends HttpError {
  code = 500
}
