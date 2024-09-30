import { MutationTree } from 'vuex';
import { PlacesState } from './state';
import { Feature } from '@/interfaces/places';


const mutation: MutationTree<PlacesState> = {
    setLngLat( state: PlacesState, { lng, lat }: { lng: number, lat: number } ) {
        console.log(lng, lat);
        state.userLocation = [ lng, lat ];
        state.isaloading = false
    },

    setIsLoadingPlaces( state ){
        state.isLoadingPlaces = true;
    },

    setPlaces( state, places: Feature[] ){
        state.places = places;
        state.isLoadingPlaces = false;
    }
}


export default mutation;