import { motion } from 'framer-motion'

interface CalendarHeatmapProps {
  checkInHistory: { [date: string]: boolean }
}

export default function CalendarHeatmap({ checkInHistory }: CalendarHeatmapProps) {
  const generateCalendarData = () => {
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 84) // Show last 12 weeks
    
    const weeks = []
    let currentWeek = []
    
    for (let i = 0; i < 84; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateString = date.toISOString().split('T')[0]
      
      currentWeek.push({
        date: dateString,
        isCheckedIn: checkInHistory[dateString] || false,
        isToday: dateString === today.toISOString().split('T')[0],
      })
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }
    
    return weeks
  }

  const weeks = generateCalendarData()
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-x-auto w-full">
        <div className="flex min-w-max">
          <div className="flex flex-col justify-between py-1 mr-2">
            {dayLabels.map((label, index) => (
              <div key={index} className="h-3 flex items-center">
                <span className="text-xs text-gray-600 font-semibold">{label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${
                      day.isCheckedIn 
                        ? 'bg-secondary' 
                        : 'bg-gray-200'
                    } ${
                      day.isToday ? 'ring-2 ring-primary' : ''
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: (weekIndex * 7 + dayIndex) * 0.01 
                    }}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center mt-4 space-x-2">
        <span className="text-xs text-gray-600">Less</span>
        <div className="flex space-x-1">
          <div className="w-2.5 h-2.5 bg-gray-200 rounded-sm" />
          <div className="w-2.5 h-2.5 bg-green-200 rounded-sm" />
          <div className="w-2.5 h-2.5 bg-green-400 rounded-sm" />
          <div className="w-2.5 h-2.5 bg-secondary rounded-sm" />
        </div>
        <span className="text-xs text-gray-600">More</span>
      </div>
    </div>
  )
}