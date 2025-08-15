import { View } from 'react-native'

// Components
import { Header } from '../../../components/text'
import SharedTranslateListItem from './shared-translate-list-item'

// Types
import type { SharedTranslateListProps } from './types'

export default function SharedTranslateList({
  isLoading,
  bibleTranslations,
  selectedBibleVersion,
  DownloadButtonComponent,
  handleVersionClick,
  getVersionDisabledState,
}: SharedTranslateListProps) {
  return (
    <View className="gap-4">
      {bibleTranslations.map((item) => (
        <View key={item.language}>
          <Header aria-level={3}>{item.language}</Header>

          <View className="mt-2 gap-2">
            {item.versions.map((version) => (
              <SharedTranslateListItem
                key={version.key}
                active={selectedBibleVersion === version.key}
                version={version}
                disabled={getVersionDisabledState?.(version.key) || isLoading}
                DownloadButtonComponent={
                  version.key !== 'tsi' &&
                  DownloadButtonComponent && (
                    <DownloadButtonComponent
                      version={version}
                      active={selectedBibleVersion === version.key}
                    />
                  )
                }
                onClick={handleVersionClick}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}
