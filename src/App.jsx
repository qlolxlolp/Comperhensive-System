import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Subscribers from './pages/Subscribers'
import Services from './pages/Services'
import Reports from './pages/Reports'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="subscribers" element={<Subscribers />} />
        <Route path="services" element={<Services />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  )
}

export default App