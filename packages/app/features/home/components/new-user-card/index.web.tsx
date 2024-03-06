import { useRouter } from 'solito/router'

// Component
import NewUserCardComponent from './new-user-card'

// Need to create separate container for the web,
// because expo-web-browser doesn't play well with Next.js.
export default function NewUserCard() {
  const router = useRouter()

  const onClick = async () => {
    router.push('/learn')
  }

  return <NewUserCardComponent onClick={onClick} />
}
