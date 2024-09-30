import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybG9zc3JyZXllczk3IiwiYSI6ImNsb2ptMGw1MDBjMTAyanFvZ255MjQwb2IifQ.CpXIX2ZPqNyn864Im3ZNUg';

if( !navigator.geolocation ){
    alert( "Tu navegador no soporta el Geolocation.." );
    throw new Error("Tu navegador no soporta el Geolocation..");
}

createApp(App).use(store).use(router).mount('#app')
