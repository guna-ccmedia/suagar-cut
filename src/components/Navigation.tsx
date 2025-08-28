import { NavLink } from 'react-router-dom'
import { Home, TrendingUp, Settings } from 'lucide-react'

export default function Navigation() {
  const navItems = [
    { to: '/home', icon: Home, label: 'Home' },
    { to: '/progress', icon: TrendingUp, label: 'Progress' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-500 hover:text-primary hover:bg-primary/5'
              }`
            }
          >
            <Icon size={24} />
            <span className="text-xs font-semibold mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}