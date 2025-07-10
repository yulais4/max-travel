import '@material/web/button/text-button.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'

import { cancelAdding } from '../menu/navbar'


export const newTagForm         = document.getElementById('new-tag-form')
export const newTagSubmitBtn    = document.getElementById('new-tag-submit-btn')

const cancelBtn = document.getElementById('new-tag-cancel-btn')


cancelBtn.addEventListener('click', () => {
    cancelAdding()
})