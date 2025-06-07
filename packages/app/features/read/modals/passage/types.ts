export type PassageModalProps = {
  handlePassageBack: (_abbr?: string) => void
  redirectToPassageChapterScreen: () => void
  handlePassageChapterBack?: (_passage: string) => void
}

export type PassageGuideProps = Pick<PassageModalProps, 'handlePassageBack'>

export type PassageBibleProps = Omit<
  PassageModalProps,
  'handlePassageChapterBack'
>

export type PassageChapterProps = Pick<
  PassageModalProps,
  'handlePassageChapterBack'
>
