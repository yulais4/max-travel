import { subDays, subHours, subMonths, formatISO9075 } from 'date-fns'


const lastHourBtn = document.getElementById('last-hour-button')
const yesterdayBtn = document.getElementById('last-day-button')
const lastMonthBtn = document.getElementById('last-month-button')
const lastSixMonthBtn = document.getElementById('last-six-month-button')
const dateFilterSubmitBtn = document.getElementById('data-filter-submit')
const dateFilterResetBtn = document.getElementById('data-filter-reset')

const dateForFilter = document.getElementById('date-for')
const dateToFilter = document.getElementById('date-to')

const nowDate = new Date()
// Секунды надо выставить в 0, инче форма не принимает.
const lastHourDate = formatISO9075(subHours(nowDate, 1).setSeconds(0))
const yesterdayDate = formatISO9075(subDays(nowDate, 1).setSeconds(0))
const lastMonthDate = formatISO9075(subMonths(nowDate, 1).setSeconds(0))
const lastSixMonthDate = formatISO9075(subMonths(nowDate, 6).setSeconds(0))


lastHourBtn.addEventListener('click', () => applyDateForFilter(lastHourDate))
yesterdayBtn.addEventListener('click', () => applyDateForFilter(yesterdayDate))
lastMonthBtn.addEventListener('click', () => applyDateForFilter(lastMonthDate))
lastSixMonthBtn.addEventListener('click', () => applyDateForFilter(lastSixMonthDate))
dateFilterResetBtn.addEventListener('click', () => applyDateForFilter(""))

function applyDateForFilter(date){
    dateForFilter.value = date
    dateToFilter.value = ""
    dateFilterSubmitBtn.click()
}