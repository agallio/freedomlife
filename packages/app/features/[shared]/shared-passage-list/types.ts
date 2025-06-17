import type { PassageDataItemType } from '../../../utils/constants'

export type SharedPassageListProps = {
  isEmpty: boolean
  emptyText: string
  passageData: PassageDataItemTypeWithJumpResult[]
  selectedBibleVersion?: string
  handleSelectPassage: (_: {
    selectedPassage: string
    isJumpResult?: boolean
  }) => void
}

export type PassageDataItemTypeWithJumpResult = PassageDataItemType & {
  isJumpResult?: boolean
}
