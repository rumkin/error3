import Error3 from 'error3'

const formatters = {
  404: ({url}) => `Url "${url} not found`,
  500: (_, [error]) => `Internal server error: ${error.message}`
}

class HttpError extends Error3 {
  format(details: object, errors: Error[]) {
    return formatters[this.code](details, errors)
  }
}

type HttpDetails = {
  url: string
}

export class NotFound extends HttpError<HttpDetails, void> {
  code = 404
}

export class InternalError extends HttpError<HttpDetails, [error]> {
  code = 500
}
