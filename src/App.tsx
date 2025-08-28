import { Routes, Route, Navigate } from 'react-router-dom'
import { ChallengeProvider } from './contexts/ChallengeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Progress from './pages/Progress'
import Settings from './pages/Settings'

function App() {
  return (
    <ChallengeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ChallengeProvider>
  )
}

export default App