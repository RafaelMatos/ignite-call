import { Calendar } from '@/Components/Calendar'
import {
  Container,
  SkeletonTimePickerItem,
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
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [loadingTimeIntervals, setLoadingTimeIntervals] = useState(true)

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
      setLoadingTimeIntervals(true)
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      setLoadingTimeIntervals(false)
      return response.data
    },
    enabled: !!selectedDate,
  })

  const possibleTimes = availability?.possibleTimes
  const blockedTimes = availability?.blockedTimes

  const referenceDate = dayjs(String(selectedDateWithoutTime))

  const availableTimes = possibleTimes?.filter((time) => {
    const isTimeBlocked = blockedTimes?.some(
      (blockedTime) => new Date(blockedTime.date).getHours() === time,
    )

    const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

    return !isTimeBlocked && !isTimeInPast
  })

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
            {loadingTimeIntervals ? (
              <>
                <SkeletonTimePickerItem />
                <SkeletonTimePickerItem />
                <SkeletonTimePickerItem />
                <SkeletonTimePickerItem />
              </>
            ) : (
              availability?.possibleTimes?.map((hour) => {
                return (
                  <TimePickerItem
                    key={hour}
                    onClick={() => handleSelectTime(hour)}
                    disabled={!availableTimes?.includes(hour)}
                  >
                    {String(hour).padStart(2, '0')}:00h
                  </TimePickerItem>
                )
              })
            )}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
