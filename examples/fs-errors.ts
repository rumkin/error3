import Error3 from 'error3'

export abstract class FsError extends Error3 {}

type CommonDetails = {
  filepath: string
}

type FileNotFoundDetails = CommonDetails

type FileTooLargeDetails = CommonDetails & {
  size: number
}

export class FileNotFound extends FsError<FileNotFoundDetails, void> {
  format({filepath}) {
    return `File or directory "${filepath}" not found`
  }
}

export class FileTooLarge extends FsError<FileTooLargeDetails, void> {
  format({filepath, size}) {
    return `File "${filepath}" too large (${size})`
  }
}

export class Unknown extends FsError<CommonDetails, [Error]> {
  format({filepath}, [error]) {
    return `Unknown error at path "${filepath}": ${error.message}`
  }
}
