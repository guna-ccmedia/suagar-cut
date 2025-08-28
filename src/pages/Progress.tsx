import { motion } from 'framer-motion'
import { Calendar, Award, Target, Flame } from 'lucide-react'
import { useChallengeData } from '@/contexts/ChallengeContext'
import CalendarHeatmap from '@/components/CalendarHeatmap'

export default function Progress() {
  const { challengeType, currentStreak, checkInHistory, getTotalCompletedDays } = useChallengeData()

  const totalCompleted = getTotalCompletedDays()
  const progressPercentage = challengeType ? (currentStreak / challengeType) * 100 : 0
  const daysRemaining = challengeType ? Math.max(0, challengeType - currentStreak) : 0

  const stats = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${currentStreak} days`,
      color: 'text-primary',
      bgColor: 'bg-red-50',
    },
    {
      icon: Target,
      label: 'Goal',
      value: `${challengeType} days`,
      color: 'text-secondary',
      bgColor: 'bg-teal-50',
    },
    {
      icon: Calendar,
      label: 'Days Left',
      value: `${daysRemaining} days`,
      color: 'text-accent',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Award,
      label: 'Total Completed',
      value: `${totalCompleted} days`,
      color: 'text-warning',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="min-h-screen p-5 pt-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Your Progress</h1>
          <p className="text-gray-600 font-medium">Keep up the amazing work!</p>
        </div>

        <motion.div 
          className="card mb-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-5">Overall Progress</h3>
          <div className="flex justify-center mb-5">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#f0f0f0"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#FF6B6B"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 40 * (1 - progressPercentage / 100)
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {progressPercentage.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <p className="text-lg font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Check-in History</h3>
          <CalendarHeatmap checkInHistory={checkInHistory} />
        </motion.div>

        <motion.div 
          className="card mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Milestones</h3>
          <div className="flex justify-around">
            <div className={`text-center p-3 rounded-xl ${
              currentStreak >= 7 ? 'bg-secondary/10 border-2 border-secondary' : 'bg-gray-50'
            }`}>
              <p className="font-bold text-gray-800">7 Days</p>
              <p className="text-xs text-gray-600">First Week</p>
            </div>
            <div className={`text-center p-3 rounded-xl ${
              currentStreak >= 21 ? 'bg-secondary/10 border-2 border-secondary' : 'bg-gray-50'
            }`}>
              <p className="font-bold text-gray-800">21 Days</p>
              <p className="text-xs text-gray-600">Habit Formed</p>
            </div>
            {challengeType === 100 && (
              <div className={`text-center p-3 rounded-xl ${
                currentStreak >= 100 ? 'bg-secondary/10 border-2 border-secondary' : 'bg-gray-50'
              }`}>
                <p className="font-bold text-gray-800">100 Days</p>
                <p className="text-xs text-gray-600">Champion</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}