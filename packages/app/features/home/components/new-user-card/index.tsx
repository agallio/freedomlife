import * as WebBrowser from 'expo-web-browser'

// Component
import NewUserCardComponent from './new-user-card'

export default function NewUserCard() {
  const onClick = async () => {
    await WebBrowser.openBrowserAsync(
      'https://freedomlife.id/learn?webview=true',
    )
  }

  return <NewUserCardComponent onClick={onClick} />
}
