import 'leaflet/dist/leaflet.js'

import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import * as categories from './components/categories'
import {getComment, sendComment} from './comments'
import { sendLike, sendDislike } from './likes'
// Подгоняем размеры карты. //
document.getElementById('map').style.height = screen.availHeight
// Обновление карты при изменении размеров окна
window.addEventListener('resize', () => {
    map.invalidateSize();
});

// Костыль
if (categories){}

//////////////////////////
// Инициализация карты. //
//////////////////////////
window.map = L.map('map').setView([57.029, 37.321], 6);

// Добавляем кнопки масштаба (по умолчанию они в левом верхнем углу)
L.control.zoom({ position: 'topright' }).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

var click_lat;
var click_lng;

const HOSTNAME = 'https://redzone.link';
const X_CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

// Создаём объект групирующий тэги.
const markers = L.markerClusterGroup();

// Buttons
const addTagBtn         = document.getElementById('add-tag-btn')
const aboutBtn          = document.getElementById('about-toggle-btn')
const cancelAddingBtn   = document.getElementById('new-tag-cancel-btn')
const closeFiltersBtn   = document.getElementById("data-filter-close")
const filterButton      = document.getElementById("filter-toggle-btn");
const filterMenu        = document.getElementById("filters-menu");
const submintAddgBtn    = document.getElementById('new-tag-submit-btn')
const myGeoBtn          = document.getElementById("mygeo-btn")

const newTagForm        = document.getElementById('new-tag-form')
const selectedLatlng    = document.getElementById('selected-latlng')

// Filters
const dateForFilter = document.getElementById('date-for')
const dateToFilter  = document.getElementById('date-to')

const aboutMenu = document.getElementById('about-menu')
const navbar    = document.getElementById("navbar")
const topBar    = document.getElementById('topbar')

const markerPopup = document.getElementById('marker-popup').cloneNode(true)

addTagBtn.addEventListener('click', () => { addTag() })
cancelAddingBtn.addEventListener('click', () => { cancelAdding() })

/*
| Всплывающее меню фильтров.
*/
filterButton.addEventListener("click", () => {
    filterMenu.classList.remove("hidden")
    filterMenu.classList.add("active")

    topBar.classList.remove("active")
    topBar.classList.add("hidden")
});
closeFiltersBtn.addEventListener("click", () => {
    filterMenu.classList.remove("active");
    filterMenu.classList.add("hidden");

    topBar.classList.remove("hidden")
    topBar.classList.add("active")
})


/*
| Всплывающее окно, лайки и коментарии.
*/
markers.on("popupopen", async (ev) => {
    const markerId = ev.popup.options.markerId

    const markerDislikeBtn = document.getElementById("marker-dislike-btn")
    const markerLikeBtn = document.getElementById("marker-like-btn")
    const markerLikeCounter = document.getElementById("marker-likes-counter")

    const localStrData = JSON.parse(localStorage.getItem("markerLikes"))

    if (localStrData[markerId] == 'dislike'){
        markerDislikeBtn.disabled = true
    }
    if (localStrData[markerId] == 'like'){
        markerLikeBtn.disabled = true
    }
    
    markerLikeBtn.addEventListener("click", () => {
        sendLike(markerId, X_CSRF_TOKEN)
        markerLikeCounter.textContent ++

        markers.clearLayers();
        // Add new tag.
        print_tags();
    }, {
        once: true
    })
    markerDislikeBtn.addEventListener("click", () => {
        sendDislike(markerId, X_CSRF_TOKEN)
        markerLikeCounter.textContent --

        markers.clearLayers();
        // Add new tag.
        print_tags();
    }, {
        once: true
    })

    /*
    | Коменты.
    */
    const commentBlock      = document.getElementById("comment-block")
    const newTagCommentForm = document.getElementById("new-tag-comment-form")
    const newTagSubmitBtn   = document.getElementById("new-tag-submit-btn")

    let htmlCommentsBlock = ""
    commentBlock.innerHTML = ""

    let comments = await getComment(markerId)
    
    for (let k in comments){
        const date = new Date(comments[k].created_at)
        htmlCommentsBlock +=
            "<div class='comment'>" +
                "<div class='row-absolute'>" +
                    "<h6>" + comments[k].username           + "</h6>" +
                    "<h6>" + date.toLocaleString('ru-RU')   + "</h6>" +
                "</div>" +
                "<p>" + comments[k].body + "</p>" +
            "</div>"

        console.log(comments[k])
    }
    commentBlock.innerHTML = htmlCommentsBlock

    // Отправка коммента.
    newTagCommentForm.addEventListener("submit", async (ev) => {
        const username      = newTagCommentForm.username.value
        const description   = newTagCommentForm.description.value

        ev.preventDefault()

        if(await sendComment(markerId, username, description, X_CSRF_TOKEN) == 0)
            location.reload()
    })
})

///////////////////////////////////
// Забираем и расчерчиваем тэги. //
///////////////////////////////////

// Вот эта шляпа забирает //
async function get_tags()
{
    const uri = '/getTags?dateFor=' + dateForFilter.value +
                                    '&dateTo=' + document.getElementById("date-to").value


    try {
        const response = await fetch(uri);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json(); // Возвращаем данные в формате JSON
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error; // Пробрасываем ошибку, чтобы можно было обработать её снаружи
    }
}

// А эта в цикле перебирает JSON и расчерчивает //
async function print_tags(){
    const tags = await get_tags();          // Забираем теги.

    for(let k in tags){                     // В цикле передаём их в группу.
        const tagDate = new Date(tags[k].updated_at);
        
        let tagType
        if (tags[k].type){
            tagType = categories[tags[k].type]
        }

        markerPopup.querySelector('#marker-info').textContent = '№' + tags[k].id 
        markerPopup.querySelector('#marker-date').textContent = 'Дата создания: ' + tagDate.toLocaleString('ru-RU')
        tags[k].type ? markerPopup.querySelector('#merker-type').textContent = 'Type: ' + tagType.getFullName() :
            markerPopup.querySelector('#merker-type').textContent = ''
        markerPopup.querySelector('#marker-username').textContent = 'Username: ' + tags[k].username
        markerPopup.querySelector('#marker-description').textContent = 'Description: ' + tags[k].description
        markerPopup.querySelector('#marker-likes-counter').textContent = tags[k].likes - tags[k].dislikes

        markers.addLayer(L.marker([tags[k].lat, tags[k].lng])
            .bindPopup(markerPopup.innerHTML, {
                markerId: tags[k].id
        }))
    }
    map.addLayer(markers);
};
print_tags();


//////////////////
//  Фильтры.    //
//////////////////

// Фильтр работы с датой.
const dataFilter = document.getElementById("data-filter");

dataFilter.addEventListener("submit", (ev) =>
{
    ev.preventDefault();
    // Удаляем старое.
    markers.clearLayers();
    // Чертим новое.
	print_tags();
});


///////////////////////////
// Создание нового тэга. //
///////////////////////////
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
    }, {
        once: true
    })

    map.on('click', (ev) => {
        if (newTemporalTag) {
            map.removeLayer(newTemporalTag)
        }

        click_lat = ev.latlng.lat
        click_lng = ev.latlng.lng

        newTemporalTag = L.marker(ev.latlng).addTo(map)

        navbar.classList.remove("active")
        navbar.classList.add("hidden")

        newTagForm.style.display = "inline-block"

        newTagForm.addEventListener('submit', (ev) => {
            const username      = newTagForm.username.value
            const description   = newTagForm.description.value
            const type          = newTagForm.type.value
            send_new_tag(username, description, type)

            // Stop autoreload page.
            ev.preventDefault();

            newTagForm.style.display = "none"
            addTagBtn.style.display = "flex"

            cancelAdding()
        }, {
            once: true
        })
    return
    })
}
// Функция отмены создания.
function cancelAdding(){
    navbar.classList.remove("hidden")
    navbar.classList.add("active")

    newTagForm.style.display = "none"

    if (newTemporalTag) {
        map.removeLayer(newTemporalTag)
    }
    addTagBtn.innerHTML = "➕ Add Tag"
    addTagBtn.addEventListener('click', () => { addTag() })

    map.off("click")
}


///////////////////////////////
// Работа с формой отправки. //
///////////////////////////////
async function send_new_tag(username, description, type)
{
    // Отправка запроса на сервер.
    await fetch('/sendTag', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': X_CSRF_TOKEN
        },
        body: JSON.stringify({
            username: username,
            description: description,
            type: type,
            lat: click_lat,
            lng: click_lng,
        })
    })
    .catch(error => console.error('Error: ', error));

    markers.clearLayers();
    // Add new tag.
    print_tags();
}


/////////////////////////////////////
// Работаем с текущей геолокацией. //
/////////////////////////////////////
// Запрос геолокации
myGeoBtn.addEventListener("click", () => {
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

/*
| Работа с LocalStorage
*/
if (!localStorage.getItem("markerLikes")){

    localStorage.setItem("markerLikes", JSON.stringify({'':''}))
}