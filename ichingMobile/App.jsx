import { ReadingProvider } from './src/context/readingContext';
import RootNavigation from './src/navigation';

export default function App() {
  return (
    <ReadingProvider>
      <RootNavigation />
    </ReadingProvider>
  )
}
