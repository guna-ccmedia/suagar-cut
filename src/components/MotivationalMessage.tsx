import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart } from 'lucide-react'

interface MotivationalMessageProps {
  day: number
  onClose: () => void
}

const motivationalMessages: { [key: number]: string } = {
  1: "🎉 Day 1 complete! You avoided sugar today. Your skin thanks you!",
  2: "💪 Two days strong! Your body is already starting to adjust.",
  3: "✨ Day 3 done! Notice how your energy levels are stabilizing?",
  4: "🌟 Four days of freedom! Your taste buds are beginning to reset.",
  5: "🚀 Five days in! Cravings should be getting easier to manage.",
  6: "💎 Six days of strength! You're building an incredible habit.",
  7: "🎊 One week complete! Cravings are already starting to fade.",
  8: "🌈 Day 8 victory! Your mood swings are becoming more balanced.",
  9: "⚡ Nine days strong! Feel that steady energy throughout the day?",
  10: "🏆 Double digits! Your willpower is getting stronger each day.",
  11: "🌸 Day 11 success! Your skin is likely looking clearer now.",
  12: "🧠 Twelve days in! Mental clarity is one of your new superpowers.",
  13: "💝 Lucky day 13! You're loving your body by avoiding sugar.",
  14: "🎯 Two weeks complete! Habits are forming - you're doing amazing!",
  15: "🌊 Day 15 flow! Notice how you don't need sugar for energy anymore?",
  16: "🔥 Sixteen days of fire! Your metabolism is thanking you.",
  17: "🌅 Day 17 sunrise! Each day brings you closer to your goal.",
  18: "🎪 Day 18 celebration! You're in the final stretch - keep going!",
  19: "⭐ Nineteen days of stardom! You're a sugar-free champion.",
  20: "🎨 Day 20 masterpiece! You've painted a beautiful healthy habit.",
  21: "🏅 21 DAYS COMPLETE! You've built a new habit! Your energy is rising!",
  30: "🚀 30 days of power! You're officially sugar-free royalty!",
  50: "💎 50 days of diamonds! Halfway to 100 - you're unstoppable!",
  75: "🏔️ 75 days conquered! You've climbed the mountain of change!",
  100: "👑 100 DAYS CHAMPION! You've completely transformed your relationship with sugar!",
}

export default function MotivationalMessage({ day, onClose }: MotivationalMessageProps) {
  const getMessage = (day: number): string => {
    if (motivationalMessages[day]) {
      return motivationalMessages[day]
    }
    
    if (day < 7) {
      return `🌟 Day ${day} complete! Every sugar-free day is a victory for your health!`
    } else if (day < 21) {
      return `💪 ${day} days strong! You're building incredible willpower and self-control.`
    } else if (day < 50) {
      return `🚀 Day ${day} achieved! Your body is loving this healthy transformation!`
    } else if (day < 100) {
      return `👑 ${day} days of excellence! You're a true sugar-free warrior!`
    } else {
      return `🏆 Day ${day} mastery! You've gone beyond the challenge - you're living the lifestyle!`
    }
  }

  useEffect(() => {
    const timer = setTimeout(onClose, 6000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 max-w-sm w-full relative shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <Heart size={40} className="text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Congratulations!</h2>
            <p className="text-white/95 text-lg leading-relaxed mb-6">
              {getMessage(day)}
            </p>
            
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-xl border border-white/30 transition-all duration-200"
            >
              Keep Going!
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}