import { useMapStore, usePlacesStore } from "@/composables";
import mapboxgl from "mapbox-gl";
import { defineComponent, onMounted, ref, watch } from "vue";


export default defineComponent({
    name: 'MapView',
    setup() {
        const mapElement = ref<HTMLDivElement>();
        const { isLoading, userLocation, isUserLocationReady } = usePlacesStore();
        const { setMap } = useMapStore();



        const initMap = async () => {
            if( !mapElement.value ) throw new Error("Div Element no exits");
            if( !userLocation.value ) throw new Error("User Location no exits");

            // await console.log("TODO OK!!!!!");
            

            await Promise.resolve();

            const map = new mapboxgl.Map({
                container: mapElement.value, // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                // center: [-74.5, 40], // starting position [lng, lat]
                center: userLocation.value, // starting position [lng, lat]
                zoom: 15, // starting zoom
    
            });

            //TODO: POPUP LOCATION
            const myLocationPopup = new mapboxgl.Popup()
                .setLngLat( userLocation.value )
                .setHTML(`
                    <h4>Aquí estoy</h4>
                    <p>Actualmente en Santa Elena</p>
                    <p> ${ userLocation.value }</p>
                `)
            
                
            //TODO: ADD MARKER
            const myLocationMarker = new mapboxgl.Marker()
                .setLngLat( userLocation.value )
                .setPopup( myLocationPopup )
                .addTo( map );

            //TODO: ESTABLECER EL MAP EN VUEX
            setMap( map );
            
            
        }

        onMounted( () => {
            // console.log( mapElement.value );
            if( isUserLocationReady.value ) return initMap();

            // console.log("No tengo localizacion aún..");
            
            
        })

        watch( isUserLocationReady, ( newVal ) => {
            if( isUserLocationReady.value ) initMap();
        })

        return{

            isUserLocationReady,
            mapElement
        }
    }
});