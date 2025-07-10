import '@material/web/button/outlined-button.js'
import '@material/web/icon/icon.js'
import '@material/web/iconbutton/filled-tonal-icon-button.js'
import '@material/web/iconbutton/outlined-icon-button.js'
import '@material/web/textfield/filled-text-field.js'

import { sendComment } from '../../../functions/downloader'

const bottomPopup = document.getElementById('bottom-popup')
const bottomPopupCloseBtn = document.getElementById('bottom-popup-close-btn') 

const newTagCommentForm = document.getElementById("new-tag-comment-form")

bottomPopupCloseBtn.addEventListener('click', () => {
    bottomPopup.classList.add('hidden')
})

let markerId = document.selectedMarker


/*
| Likes/dislikes.
*/
const markerDislikeBtn = bottomPopup.querySelector("#marker-dislike-btn")
const markerLikeBtn = bottomPopup.querySelector("#marker-like-btn")
const markerLikeCounter = bottomPopup.querySelector("#marker-likes-counter")
                    
const localStrData = JSON.parse(localStorage.getItem("markerLikes"))

/*
if (localStrData[markerId] == 'dislike'){
    markerDislikeBtn.disabled = true
}
if (localStrData[markerId] == 'like'){
    markerLikeBtn.disabled = true
}
*/
                        
markerLikeBtn.addEventListener("click", () => {
    //sendLike(markerId, X_CSRF_TOKEN)
    markerLikeCounter.textContent ++
}, {
    once: true
})
markerDislikeBtn.addEventListener("click", () => {
    //sendDislike(markerId, X_CSRF_TOKEN)
markerLikeCounter.textContent --
}, {
    once: true
})



// Отправка коммента.
newTagCommentForm.addEventListener("submit", async (ev) => {
    const username      = newTagCommentForm.username.value
    const description   = newTagCommentForm.description.value

    ev.preventDefault()

    if(await sendComment(document.selectedMarker, username, description) == 0){
        close()
        location.reload()
    }
    else {
        close()
        alert("Error. Sending false.")
    }
})




/*
| Работа с LocalStorage
*/
if (!localStorage.getItem("markerLikes")){

    localStorage.setItem("markerLikes", JSON.stringify({'':''}))
}



function close(){
    if (!bottomPopup.classList.contains("hidden")){
        bottomPopup.classList.add("hidden")
    }
}