import type { BibleTranslationItemType } from '../../../utils/constants'
import type { TranslateItemDownloadButtonProps } from '../../read/modals/translate/translate-item-download-button/types'

export type SharedTranslateListProps = {
  isLoading?: boolean
  bibleTranslations: BibleTranslationItemType[]
  selectedBibleVersion: string
  DownloadButtonComponent?: (_: TranslateItemDownloadButtonProps) => JSX.Element
  handleVersionClick: (_version: string) => void
  getVersionDisabledState?: (_version: string) => boolean
}
