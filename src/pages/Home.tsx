import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Heart, Calendar } from 'lucide-react'
import { useChallengeData } from '@/contexts/ChallengeContext'
import MotivationalMessage from '@/components/MotivationalMessage'

export default function Home() {
  const {
    challengeType,
    currentStreak,
    isCheckedInToday,
    checkIn,
  } = useChallengeData()

  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false)

  const handleCheckIn = useCallback(() => {
    if (isCheckedInToday) return

    checkIn()
    setShowMotivationalMessage(true)
  }, [isCheckedInToday, checkIn])

  useEffect(() => {
    if (!showMotivationalMessage) return

    const timer = setTimeout(() => setShowMotivationalMessage(false), 4000)
    return () => clearTimeout(timer)
  }, [showMotivationalMessage])

  const progressPercentage = challengeType && currentStreak 
    ? Math.min((currentStreak / challengeType) * 100, 100)
    : 0

  return (
    <div className="min-h-screen p-5 pt-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Sugar Cut Challenge</h1>
          <p className="text-gray-600 font-medium">Stay strong, stay healthy!</p>
        </div>

        <motion.div 
          className="card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-3">
            <Calendar size={24} className="text-primary mr-2" />
            <span className="text-3xl font-bold text-gray-800">Day {currentStreak}</span>
          </div>
          <p className="text-center text-gray-600 font-semibold mb-5">
            {challengeType} Day Challenge
          </p>
          
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 font-semibold">
              {progressPercentage.toFixed(1)}% Complete
            </p>
          </div>
        </motion.div>

        <motion.button
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
            isCheckedInToday
              ? 'bg-secondary text-white'
              : 'bg-primary hover:bg-primary/90 text-white'
          }`}
          onClick={handleCheckIn}
          disabled={isCheckedInToday}
          whileHover={{ scale: isCheckedInToday ? 1 : 1.02 }}
          whileTap={{ scale: isCheckedInToday ? 1 : 0.98 }}
        >
          {isCheckedInToday ? (
            <>
              <Check size={24} />
              <span>Completed Today!</span>
            </>
          ) : (
            <>
              <Heart size={24} />
              <span>Mark Today Sugar-Free</span>
            </>
          )}
        </motion.button>

        <motion.div 
          className="card mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">Today's Focus</h3>
          <p className="text-gray-600 text-center italic leading-relaxed">
            "Every sugar-free day is a victory for your health and well-being."
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {showMotivationalMessage && (
          <MotivationalMessage 
            day={currentStreak}
            onClose={() => setShowMotivationalMessage(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}