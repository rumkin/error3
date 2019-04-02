import Error3 from 'error3'
import MessageFormat from 'intl-messageformat'

const locales = {
  'en-US': {
    my_error: 'This is MyError message'
  },
  'ru-RU': {
    my_error: 'Это сообщение для ошибки MyError'
  }
}

const locale = process.env.LANG.split('.').pop()
const formatter = new MessageFormat(locales[locale].my_error)

export class MyError extends Error3 {
  code = 'my_error'

  format(details) {
    // i18n is browser i18n instance:
    return formatter.format(details)
  }
}
