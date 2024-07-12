// Components
import { Text } from '../../../components/text'
import ExternalLink from '../../../components/external-link.web'

// Utils
import dayjs from '../../../utils/dayjs'

/**
 * Web only!
 */
export default function FooterCredits() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 pb-4">
      <Text
        customFontSize="text-xs"
        className="text-gray-600 dark:text-gray-300"
      >
        Lisensi GPL-3.0 © {dayjs().format('YYYY')} — freedomlife
      </Text>
      <Text
        customFontSize="text-xs"
        className="text-gray-600 dark:text-gray-300"
      >
        Mengalami kendala?{' '}
        <a href="mailto:agallio@freedomlife.id" className="hover:underline">
          Klik disini ↗
        </a>
      </Text>
      <Text
        customFontSize="text-xs"
        className="text-gray-600 dark:text-gray-300"
      >
        Dibuat oleh{' '}
        <ExternalLink href="https://agallio.xyz">@agallio ↗</ExternalLink>
      </Text>
    </div>
  )
}
