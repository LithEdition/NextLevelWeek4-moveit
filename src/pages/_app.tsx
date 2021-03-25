import '../styles/global.css'
import { ChallengerProvider } from '../contexts/ChallengerContext'

function MyApp({ Component, pageProps }) {
  return (
        <Component {...pageProps} />
  )
}

export default MyApp
