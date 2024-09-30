import { MutationTree } from 'vuex';
import { MapState } from './state';
import { Feature } from '@/interfaces/places';
import mapboxgl from 'mapbox-gl';


const mutation: MutationTree<MapState> = {
    setMap( state, map: mapboxgl.Map ) {
        state.map = map
    },

    setDistanceDuration( state, { distance, duration }: { distance: number, duration: number }){
        let kms = distance / 1000;
            kms = Math.round( kms * 100 );
            kms /= 100;

        state.distance = kms;
        state.duration = Math.floor( duration / 60 );
    },

    setPlaceMarkers( state, places: Feature[] ){

        // console.log("PLACES: ", places);
        
        state.markers.forEach( marker => marker.remove() ); //TODO: DELETE MARKERS
        state.markers = [];
        
        if( !state.map ) return; 

        //TODO: CREATE NEW MARKERS
        for (const place of places) {
            
            const [ lng, lat ] = place.center;
             //TODO: POPUP LOCATION
            const popup = new mapboxgl.Popup()
                .setLngLat([ lat, lng ])
                .setHTML(`
                    <h4>${ place.text }</h4>
                    <p>${ place.place_name }</p>                    
                `);
         
             
            //TODO: ADD MARKER
            const marker = new mapboxgl.Marker()
                .setLngLat([ lat, lng ])
                .setPopup( popup )
                
                .addTo( state.map );

            // console.log("MARKER: ", marker);
            

            state.markers.push( marker );

        }

        console.log("LISTA DE MARKERS: ", state.markers);

        //TODO: DELETE POLYLINE
        if( state.map.getLayer('RouteString') ){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
            state.distance = undefined;
            state.duration = undefined;
        }
        

    },

    setRoutePolyLine( state, coords: number[][] ){
        const start = coords[0];
        const end = coords[ coords.length - 1 ];

        //TODO: DEFINE BOUNDS
        const bounds = new mapboxgl.LngLatBounds(
            [start[0], start[1]],
            [start[0], start[1]],
        );

        //TODO: ADD POINTS TO BOUND
        for( const coord of coords  ){
            const newCoord: [ number, number ] = [ coord[0], coord[1] ];
            bounds.extend( newCoord );
        }

        state.map?.fitBounds( bounds, {
            padding: 300
        });

        //TODO: Polyline
        const soucerData: mapboxgl.AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }

        };
        //TODO: PARA RECARGAR NUEVAMENTE
        if( state.map?.getLayer('RouteString') ){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource( 'RouteString', soucerData );

        //VER RUTA
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                "line-cap": 'round',
                "line-join": 'round'
            },
            paint: {
                "line-color": 'black',
                "line-width": 3
            }
        })

    }
}


export default mutation;