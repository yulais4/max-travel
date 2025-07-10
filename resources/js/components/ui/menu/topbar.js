import * as filters from "./filters"

import { searchForm } from "../forms/search"



const topbar = document.getElementById("topbar")

const filterToggleBtn   = document.getElementById("filter-toggle-btn")
const searchToggleBtn   = document.getElementById("search-toggle-btn")



filterToggleBtn.addEventListener("click", () => {
    filters.open()

    topbar.classList.remove("active")
    topbar.classList.add("hidden")
})


searchToggleBtn.addEventListener("click", () => {
    searchForm.open()

    topbar.classList.remove("active")
    topbar.classList.add("hidden")
})


searchForm.closeBtn.addEventListener("click", () => {
    topbar.classList.remove("hidden")
    topbar.classList.add("active")
})



filters.buttons.close.addEventListener("click", (ev) => {
    filters.close()

    topbar.classList.remove("hidden")
    topbar.classList.add("active")
})