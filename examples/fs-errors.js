import Error3 from 'error3'

export class FsError extends Error3 {}

export class FileNotFound extends FsError {
  format({filepath}) {
    return `File or directory "${filepath}" not found`
  }
}

export class FileTooLarge extends FsError {
  format({filepath, size}) {
    return `File "${filepath}" too large (${size})`
  }
}

export class Unknown extends FsError {
  format({filepath}) {
    return `Unknown error rised "${filepath}"`
  }
}
