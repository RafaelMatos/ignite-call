import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { getWeekDays } from '@/utils/get-week-days'

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Novembro <span>2023</span>
        </CalendarTitle>
        <CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => {
              return <th key={weekDay}>{weekDay}.</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CalendarDay disabled={true}>29</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled={true}>30</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled={true}>31</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled={true}>4</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay disabled={true}>5</CalendarDay>
            </td>
            <td>
              <CalendarDay>6</CalendarDay>
            </td>
            <td>
              <CalendarDay>7</CalendarDay>
            </td>
            <td>
              <CalendarDay>8</CalendarDay>
            </td>
            <td>
              <CalendarDay>9</CalendarDay>
            </td>
            <td>
              <CalendarDay>10</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled={true}>11</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay disabled={true}>12</CalendarDay>
            </td>
            <td>
              <CalendarDay>13</CalendarDay>
            </td>
            <td>
              <CalendarDay>14</CalendarDay>
            </td>
            <td>
              <CalendarDay>15</CalendarDay>
            </td>
            <td>
              <CalendarDay>16</CalendarDay>
            </td>
            <td>
              <CalendarDay>17</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled={true}>18</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay disabled={true}>19</CalendarDay>
            </td>
            <td>
              <CalendarDay>20</CalendarDay>
            </td>
            <td>
              <CalendarDay>21</CalendarDay>
            </td>
            <td>
              <CalendarDay>22</CalendarDay>
            </td>
            <td>
              <CalendarDay>23</CalendarDay>
            </td>
            <td>
              <CalendarDay>24</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled={true}>25</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay disabled={true}>26</CalendarDay>
            </td>
            <td>
              <CalendarDay>27</CalendarDay>
            </td>
            <td>
              <CalendarDay>28</CalendarDay>
            </td>
            <td>
              <CalendarDay>29</CalendarDay>
            </td>
            <td>
              <CalendarDay>30</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled={true}>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled={true}>2</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}