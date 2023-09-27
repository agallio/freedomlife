import type { ColorSchemeName } from 'react-native'

export const colors = {
  text: '#171717',
  passageCardTitle: '#064e3b',
  newUserCardTitle: '#1e3a8a',
  tab: '#fff',
  tabActive: '#6ee7b7',
  tabText: '#064e3b',
  tabTextActive: '#064e3b',
  bottomModal: '#f3f4f6',
  headerBackground: 'rgba(249, 250, 251, 0.6)',
  headerBackgroundActive: 'rgba(110, 231, 183, 0.6)',
  headerBorderBottom: '#e6e6e6',
  headerBorderBottomActive: '#34d399',
  bibleSupText: '#047857',
  bibleGuideIcon: '#34d399',
  inGuideCard: '#fff',
  inGuideCardButton: '#6ee7b7',
  guideCard: '#fff',
  guideMonthLabel: '#a7f3d0',
  passageNumberBorder: '#d1d5db',
  retryInternetButton: '#e5e7eb',
  buttonDisabled: '#d1d5db',
  buttonTextDisabled: '#9ca3af',
} as const

export const darkColors = {
  text: '#fff',
  passageCardTitle: '#fff',
  newUserCardTitle: '#fff',
  tab: '#374151',
  tabActive: '#047857',
  tabText: '#fff',
  tabTextActive: '#fff',
  bottomModal: '#1f2937',
  headerBackground: 'rgba(31, 41, 55, 0.8)',
  headerBackgroundActive: 'rgba(4, 120, 87, 0.8)',
  headerBorderBottom: '#334155',
  headerBorderBottomActive: '#065f46',
  bibleSupText: '#6ee7b7',
  bibleGuideIcon: '#10b981',
  inGuideCard: '#111827',
  inGuideCardButton: '#6b7280',
  guideCard: '#4B5563',
  guideMonthLabel: '#047857',
  passageNumberBorder: '#6b7280',
  retryInternetButton: '#4b5563',
  buttonDisabled: '#111827',
  buttonTextDisabled: '#4b5563',
} as const

export const skeletonColors = (colorScheme: ColorSchemeName) =>
  colorScheme === 'dark' ? ['#3e495c', '#2e3d52'] : ['#d1d5db', '#e7eaed']
