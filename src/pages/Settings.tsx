import { motion } from 'framer-motion'
import { RotateCcw, Target, Info } from 'lucide-react'
import { useChallengeData } from '@/contexts/ChallengeContext'

export default function Settings() {
  const { challengeType, resetChallenge, currentStreak } = useChallengeData()

  const handleResetChallenge = () => {
    if (window.confirm(
      `Are you sure you want to reset your ${challengeType}-day challenge? You'll lose your current ${currentStreak}-day streak.`
    )) {
      resetChallenge()
      alert('Challenge Reset! Your challenge has been reset. Start fresh!')
    }
  }

  const handleChangeChallengeType = () => {
    const newChallengeType = challengeType === 21 ? 100 : 21
    
    if (window.confirm(
      `Switch to ${newChallengeType}-day challenge? This will reset your current progress.`
    )) {
      resetChallenge(newChallengeType)
      alert(`Challenge Changed! Switched to ${newChallengeType}-day challenge!`)
    }
  }

  const settingsItems = [
    {
      icon: Target,
      label: 'Challenge Duration',
      value: `${challengeType} Days`,
      color: 'text-primary',
      bgColor: 'bg-red-50',
      onClick: handleChangeChallengeType,
    },
    {
      icon: RotateCcw,
      label: 'Reset Challenge',
      value: 'Start over from day 1',
      color: 'text-warning',
      bgColor: 'bg-orange-50',
      onClick: handleResetChallenge,
    },
  ]

  return (
    <div className="min-h-screen p-5 pt-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Settings</h1>
          <p className="text-gray-600 font-medium">Customize your experience</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 px-1">Challenge Settings</h2>
          
          {settingsItems.map((item, index) => (
            <motion.button
              key={index}
              className="w-full card flex items-center mb-2 hover:shadow-xl transition-all duration-200"
              onClick={item.onClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center mr-3`}>
                <item.icon size={24} className={item.color} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">{item.label}</p>
                <p className="text-sm text-gray-600">{item.value}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-3">About</h2>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-3">
              <Info size={24} className="text-accent" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Sugar Cut Challenge</p>
              <p className="text-sm text-gray-600">Version 1.0.0</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-3">Tips for Success</h3>
          <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <p>• Stay hydrated with water throughout the day</p>
            <p>• Replace sugar cravings with healthy fruits</p>
            <p>• Read food labels carefully</p>
            <p>• Get enough sleep to reduce cravings</p>
            <p>• Celebrate small victories along the way</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}