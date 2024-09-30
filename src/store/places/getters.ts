import { GetterTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';


const getters: GetterTree<PlacesState, StateInterface> = {
    // someGetter( /* state */ ) {
    //     // return true;
    // }
    isUserLocationReady( state ) {
        return !!state.userLocation;
    }
}



export default getters;