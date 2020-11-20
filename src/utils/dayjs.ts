import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/id'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Jakarta')
dayjs.locale('id')
dayjs.extend(customParseFormat)

export default dayjs
