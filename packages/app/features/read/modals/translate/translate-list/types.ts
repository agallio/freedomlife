import type { BibleTranslationItemType } from '../../../../../utils/constants'

export type TranslateListProps = {
  isLoading: boolean
  availableBibleTranslations: BibleTranslationItemType[]
  handleBackMobile?: () => void
}
