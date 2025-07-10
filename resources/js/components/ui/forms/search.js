import 'leaflet/dist/leaflet.js'
import 'leaflet-control-geocoder'
import 'material-icons/iconfont/material-icons.css';


import { Form } from './Form'



class SearchForm extends Form{
    constructor(form){
        super(form)
        this.form.addEventListener('submit', (ev) => {
            this.search(this.form.input.value)
        })

        this.searchMarker = null
    }



    async search(input){

        if (!input){
            console.log("Search input is empty!")
            return
        }

        //Делим значение на 2 части
        let latLngParts = input.split(/[,\s]+/)

        if (latLngParts.length !== 2){
            alert('Не правильные координаты!')
            return
        }

        let lat = parseFloat(latLngParts[0]);
        let lng = parseFloat(latLngParts[1]);

        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            alert('Некорректный формат координат!');
            return;
        }

        let latlng = L.latLng(lat, lng)

        if(this.searchMarker){
            map.removeLayer(this.searchMarker)
        }

       const geocoder = new L.Control.Geocoder.Nominatim()
       await geocoder.reverse(latlng, map.getZoom())
        .then((results) => {
            let result = results[0]

            // Create and add to map temporal marker.
            this.searchMarker = L.marker(result.center)
                .bindPopup(`<b>Ты искал:</b><br>${result.name}`)
                .openPopup()
            this.searchMarker.addTo(map)

            // Центрируем карту.
            map.setView(result.center, 9);
        })
    }

    close(){
        super.close()
        
        if(this.searchMarker){
            map.removeLayer(this.searchMarker)
        }
    }
}



export const searchForm = new SearchForm(document.getElementById("search-form"))