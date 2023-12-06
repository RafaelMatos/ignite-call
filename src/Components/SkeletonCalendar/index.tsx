import { SkeletonCalendarBody, SkeletonCalendarDay } from './styles'
import { getWeekDays } from '@/utils/get-week-days'

export function SkeletonCalendar() {
  const shortWeekDays = getWeekDays({ short: true })
  const monthWeeks = Array.from({
    length: 5,
  }).map((week) => {
    return shortWeekDays
  })

  return (
    <>
      <SkeletonCalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => {
              return <th key={weekDay}>{weekDay}.</th>
            })}
          </tr>
        </thead>
        <tbody>
          {monthWeeks.map((week, i) => {
            return (
              <tr key={i}>
                {week.map((date) => {
                  return (
                    <td key={date.toString()}>
                      <SkeletonCalendarDay />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </SkeletonCalendarBody>
    </>
  )
}
