import { bibleTranslations } from '../../../../utils/constants'

export function filterTranslationsWithLookupSet(
  availableBibleTranslations?: string[],
) {
  const lookupSet = new Set(availableBibleTranslations)

  return bibleTranslations
    .map((item) => ({
      ...item,
      versions: item.versions.filter((version) => lookupSet.has(version.key)),
    }))
    .filter((item) => item.versions.length > 0)
}
