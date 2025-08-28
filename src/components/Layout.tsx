import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      <div className="flex flex-col h-screen">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        <Navigation />
      </div>
    </div>
  )
}