import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { PersistQueryClientProvider } from '../src/react-query/PersistQueryProvider';
import { queryClient, persistOptions } from '../src/react-query/queryClient';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store'; 
import { RootNavigator } from './navigators/stacks/RootNavigator';

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={persistOptions}
      >
        <BrowserRouter>
          {/* <DisplayChatScreens /> */}
          <RootNavigator />
        </BrowserRouter>
      </PersistQueryClientProvider>
    </ReduxProvider>
  );
}

export default App;

