import { ReadingProvider } from './src/context/readingContext';
import RootNavigation from './src/navigation';
import { Provider } from 'react-redux'
import { store } from './store';

export default function App() {

  return (
    <Provider store={store}>
      <ReadingProvider>
        <RootNavigation />
      </ReadingProvider>
    </Provider>
  )
}
