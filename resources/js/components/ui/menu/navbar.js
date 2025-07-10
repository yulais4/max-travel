import '@material/web/button/elevated-button.js'

import { newTagForm, newTagSubmitBtn } from '../forms/newTag'
import { sendNewTag } from '../../../functions/downloader'



const navbar    = document.getElementById('navbar')

const addTagBtn         = document.getElementById('add-tag-btn')
const myGeoBtn          = document.getElementById('mygeo-btn')



addTagBtn.addEventListener('click', (ev) => {
    addTag()
})



// Кнопка геолокации.
myGeoBtn.addEventListener('click', () => {
    map.locate({ setView: true, maxZoom: 7 });

    // Обработка события успешного получения геолокации
    map.on('locationfound', function(e) {
        const userLatLng = e.latlng;

        L.marker(userLatLng).addTo(map)
          .bindPopup(`Вы находитесь здесь.`)
        .openPopup();
    });

      // Обработка ошибок геолокации
      map.on('locationerror', function(e) {
        console.log(`WARN: Невозможно получить ваше местоположение: ${e.message}`);
    });
})



let click_lat
let click_lng

let newTemporalTag = null
function addTag(){
// Нажали.
    addTagBtn.innerHTML = "Выберети точку или нажмите ещё раз."

    // Эта штука отменяет добавление.
    addTagBtn.addEventListener("click", () => {

        addTagBtn.innerHTML = "➕ Add Tag"
        addTagBtn.addEventListener('click', () => { addTag() })

        map.off("click")

        //Удаляем временный маркер если есть.
        if (newTemporalTag){
            map.removeLayer(newTemporalTag)
        }
        return
    })

    // Кликаем по карте.
    map.on('click', (ev) => {

        if (newTemporalTag) {
            map.removeLayer(newTemporalTag)
        }

        click_lat = ev.latlng.lat
        click_lng = ev.latlng.lng

        newTemporalTag = L.marker(ev.latlng).addTo(map)

        navbar.classList.add("hidden")

        newTagForm.classList.remove("hidden")


        newTagForm.addEventListener('submit', async (event) => {

            const username      = newTagForm.username.value
            const description   = newTagForm.description.value
            const type          = newTagForm.type.value

            // Stop autoreload page.
            event.preventDefault();

            await sendNewTag(click_lat, click_lng, username, description, type)

            newTagForm.style.display = "none"
            addTagBtn.style.display = "flex"

            cancelAdding()
            
            location.reload()
        })
    })
}
// Функция отмены создания.
export function cancelAdding(){
    newTagForm.classList.add("hidden")

    navbar.classList.remove("hidden")
    navbar.classList.add("active")

    if (newTemporalTag) {
        map.removeLayer(newTemporalTag)
    }

    addTagBtn.innerHTML = "➕ Add Tag"
    addTagBtn.addEventListener('click', () => { addTag() })

    map.off("click")
}