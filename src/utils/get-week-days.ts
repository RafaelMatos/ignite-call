import { firstLetterUppercase } from './first-letter-uppercase'

interface GetWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('pt-Br', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      if (short) {
        return firstLetterUppercase(weekDay.substring(0, 3))
      }
      return firstLetterUppercase(weekDay)
    })
}
