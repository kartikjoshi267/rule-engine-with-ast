import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ScreenProvider } from './context/ScreenContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScreenProvider>
      <App />
    </ScreenProvider>
  </BrowserRouter>,
)
