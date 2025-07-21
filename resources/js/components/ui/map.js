import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css'

import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { get_tags, getComments } from '../../functions/downloader'
import * as filters from './menu/filters'
import * as categories from '../categories'


// Без этого не цепляются иконки.
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});



document.X_CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').getAttribute('content')


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
window.map = L.map('map',{
    center:         [57.029, 37.321],
    zoom:           6,
    }
)



// Создаём объект групирующий тэги.
window.markers = L.markerClusterGroup();

// Добавляем кнопки масштаба (по умолчанию они в левом верхнем углу)
//L.control.zoom({ position: 'topright' }).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// А эта в цикле перебирает JSON и расчерчивает //
//                             ..дороги из мефа //
export async function print_tags(){
    const tags = await get_tags();          // Забираем теги.



    for(let k in tags){                     // В цикле передаём их в группу.
        const tagDate = new Date(tags[k].updated_at);
        
        let tagType
        if (tags[k].type){
            tagType = categories[tags[k].type]
        }

        markers.addLayer(L.marker([tags[k].lat, tags[k].lng])
            .addEventListener('click', async () => {                
                // Открываем нижнее меню.
                if (document.getElementById('bottom-popup')){
                    const bottomPopup = document.getElementById('bottom-popup')
                    bottomPopup.classList.remove('hidden')

                    bottomPopup.querySelector('#marker-info').textContent = '№' + tags[k].id
                    bottomPopup.querySelector('#marker-date').textContent = 'Дата создания: ' + tagDate.toLocaleString('ru-RU')
                        tags[k].type ? bottomPopup.querySelector('#merker-type').textContent = 'Type: ' + tagType.getFullName() :
                    bottomPopup.querySelector('#merker-type').textContent = ''
                    bottomPopup.querySelector('#marker-username').textContent = 'Username: ' + tags[k].username
                    bottomPopup.querySelector('#marker-description').textContent = 'Description: ' + tags[k].description
                    bottomPopup.querySelector('#marker-likes-counter').textContent = tags[k].likes - tags[k].dislikes

                    let markerId = document.selectedMarker = tags[k].id


                    /*
                    | Отрисовка коментов.
                    */
                    const commentBlock = bottomPopup.querySelector("#comment-block")
                    let htmlCommentsBlock = ''

                    let comments = await getComments(markerId)

                    for (let k in comments){
                        const date = new Date(comments[k].created_at)
                        htmlCommentsBlock +=
                            "<div class='comment'>" +
                                "<div class='row'>" +
                                    "<h6>" + comments[k].username           + "</h6>" +
                                    "<h6>" + date.toLocaleString('ru-RU')   + "</h6>" +
                                "</div>" +
                                "<p>" + comments[k].body + "</p>" +
                            "</div>"
                        }
                    commentBlock.innerHTML = htmlCommentsBlock
                }
            })
        )
    }
    map.addLayer(markers);
};
print_tags();



filters.buttons.dateFilterSubmitBtn.addEventListener('click', (ev) =>{
    ev.preventDefault();
    // Удаляем старое.
    markers.clearLayers();
    // Чертим новое.
	print_tags();
})