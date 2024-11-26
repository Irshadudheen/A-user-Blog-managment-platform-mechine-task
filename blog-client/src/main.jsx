import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import {store,persistor} from './redux/storage'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
      <PersistGate persistor={persistor}>
    <App />
</PersistGate>
</Provider>
)
