import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'

// This entry point mounts a lazy route and does not export components for Fast Refresh.
// eslint-disable-next-line react-refresh/only-export-components
const ContentJourney = lazy(() => import('./content/ContentJourney'));
// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import('./App'));
const isJourney = /^\/content\/?$/.test(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#10120f', color: '#e8e2d5', padding: '15vw' }}>{isJourney ? 'The long way home.' : 'Sarthak Shakya'}</div>}>
      {isJourney ? <ContentJourney /> : <App />}
    </Suspense>
  </StrictMode>,
)
