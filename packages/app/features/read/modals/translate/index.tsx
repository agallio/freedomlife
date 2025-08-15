// Components
import TranslateContainer, {
  type TranslateContainerProps,
} from './translate-container'

export default function TranslateModal({
  handleBack,
}: TranslateContainerProps) {
  return <TranslateContainer handleBack={handleBack} />
}
