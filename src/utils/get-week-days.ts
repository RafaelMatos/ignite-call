import { firstLetterUppercase } from './first-letter-uppercase'

export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-Br', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      return firstLetterUppercase(weekDay)
    })
}
