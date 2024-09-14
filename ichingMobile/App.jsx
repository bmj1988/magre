import { useEffect } from 'react';
import { ReadingProvider } from './src/context/readingContext';
import RootNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { configureStore } from './store/index.js';

const store = configureStore()

export default function App() {
  // useEffect(() => {

  // })
  return (
    <Provider store={store}>
      <ReadingProvider>
        <RootNavigation />
      </ReadingProvider>
    </Provider >
  )
}
