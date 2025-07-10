import '@material/web/button/filled-tonal-button.js'

import { subDays, subHours, subMonths, formatISO9075 } from 'date-fns'



export {filtersMenu,
    close, open,
    buttons,
    dateForFilter, dateToFilter
}

const filtersMenu = document.getElementById("filters-menu")

const buttons = {
    close:               document.getElementById("data-filter-close"),
    
    lastHourBtn:         document.getElementById('last-hour-button'),
    yesterdayBtn:        document.getElementById('last-day-button'),
    lastMonthBtn:        document.getElementById('last-month-button'),
    lastSixMonthBtn:     document.getElementById('last-six-month-button'),
    dateFilterSubmitBtn: document.getElementById('data-filter-submit'),
    dateFilterResetBtn:  document.getElementById('data-filter-reset')
}

const dateForFilter = document.getElementById("date-for")
const dateToFilter  = document.getElementById("date-to")


const nowDate = new Date()
// Секунды надо выставить в 0, инче форма не принимает.
const lastHourDate      = formatISO9075(subHours(nowDate, 1).setSeconds(0))
const yesterdayDate     = formatISO9075(subDays(nowDate, 1).setSeconds(0))
const lastMonthDate     = formatISO9075(subMonths(nowDate, 1).setSeconds(0))
const lastSixMonthDate  = formatISO9075(subMonths(nowDate, 6).setSeconds(0))



buttons.lastHourBtn.addEventListener('click', () => applyDateForFilter(lastHourDate))
buttons.yesterdayBtn.addEventListener('click', () => applyDateForFilter(yesterdayDate))
buttons.lastMonthBtn.addEventListener('click', () => applyDateForFilter(lastMonthDate))
buttons.lastSixMonthBtn.addEventListener('click', () => applyDateForFilter(lastSixMonthDate))
buttons.dateFilterResetBtn.addEventListener('click', () => applyDateForFilter(""))



function close(){
    if (!filtersMenu.classList.contains("hidden")){
        filtersMenu.classList.add("hidden")
    }
}

function open(){
    if (filtersMenu.classList.contains("hidden")){
        filtersMenu.classList.remove("hidden")
    }
}


function applyDateForFilter(date){
    dateForFilter.value = date
    dateToFilter.value = ""
    buttons.dateFilterSubmitBtn.click()
}