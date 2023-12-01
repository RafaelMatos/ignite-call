import { Calendar } from '@/Components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

interface Availability {
  possibleTimes: number[]
  blockedTimes: { date: Date }[]
  startHour: number
  endHour: number
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // const [availability, setAvailability] = useState<Availability | null>(null)

  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })
      return response.data
    },
    enabled: !!selectedDate,
  })

  const { possibleTimes, blockedTimes } = availability || {}

  const availableTimes = possibleTimes?.filter((time) => {
    const isTimeBlocked = blockedTimes?.some(
      (blockedTime) => dayjs(blockedTime.date).hour() === time,
    )

    const isTimeInPast = dayjs(selectedDate)
      .set('hour', time)
      .isBefore(new Date())

    return !isTimeBlocked && !isTimeInPast
  })

  // const unavailableTimes = availability?.availableTimes.map((availableTime) => {
  //   return dayjs(availableTime).get('hour')
  // })

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span> {describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {possibleTimes?.map((hour) => {
              // const disableTimePickerItem =
              //   unavailableTimes?.includes(hour) ||
              //   dayjs(selectedDate).set('hour', hour).isBefore(new Date()) ||
              //   !availability.availableTimes.includes(hour)

              return (
                <TimePickerItem
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availableTimes?.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
