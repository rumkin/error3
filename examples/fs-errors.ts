import Error3 from 'error3'

// Create error family
export abstract class FsError extends Error3 {}

type CommonDetails = {
  filepath: string
}

type FileNotFoundDetails = CommonDetails

type FileTooLargeDetails = CommonDetails & {
  size: number
}

export class FileNotFound extends FsError<FileNotFoundDetails, void> {
  code = 'fs_not_found'

  format({filepath}) {
    return `File or directory "${filepath}" not found`
  }
}

export class FileTooLarge extends FsError<FileTooLargeDetails, void> {
  code = 'fs_too_large'

  format({filepath, size}) {
    return `File "${filepath}" too large (${size})`
  }
}

export class Unknown extends FsError<CommonDetails, [Error]> {
  code = 'fs_unknown'
  format({filepath}, [error]) {
    return `Unknown error at path "${filepath}": ${error.message}`
  }
}
