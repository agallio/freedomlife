export type PassageModalProps = {
  handlePassageBack: (_abbr?: string) => void
  redirectToPassageChapterScreen: () => void
  handlePassageChapterBack?: (_passage: string) => void
}

export type PassageGuideProps = Pick<PassageModalProps, 'handlePassageBack'>

export type PassageBibleProps = Pick<
  PassageModalProps,
  'redirectToPassageChapterScreen'
>

export type PassageChapterProps = Pick<
  PassageModalProps,
  'handlePassageChapterBack'
>
