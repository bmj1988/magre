import { ReadingProvider } from './src/context/readingContext';
import RootNavigation from './src/navigation';
import { Provider } from 'react-redux'

export default function App() {
  return (
      <ReadingProvider>
        <RootNavigation />
      </ReadingProvider>
  )
}
