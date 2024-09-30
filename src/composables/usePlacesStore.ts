import { StateInterface } from "@/store";
import { computed, onMounted } from "vue";
import { useStore } from "vuex"


export const usePlacesStore = () => {

    const store = useStore<StateInterface>();

    onMounted( () => {
        if( !store.getters['places/isUserLocationReady'] ){
            store.dispatch( 'places/getInitialLocation');
        }
    })


    return {
        //TODO: STATE
        isLoading: computed( () => store.state.places.isaloading ),
        userLocation: computed( () => store.state.places.userLocation ),
        places: computed( () => store.state.places.places ), 
        isLoadingPlaces: computed( () => store.state.places.isLoadingPlaces ), 
        
        //TODO: GETTERS
        isUserLocationReady: computed<boolean>( () => store.getters['places/isUserLocationReady'] ),
        
        //TODO: ACTIONS
        searchPlacesByTerm: ( query = "s" ) => store.dispatch( "places/searchPlacesByTerm", query )

        //TODO: MUTATIONS
    }
}