import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Stake from './pages/Stake'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Stake />} />
      </Routes>
    </BrowserRouter>
  )
}
