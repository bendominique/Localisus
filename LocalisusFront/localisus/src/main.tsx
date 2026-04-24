import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import TelaHome from './TelaHome/TelaHome'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelaHome />
  </StrictMode>,
)
