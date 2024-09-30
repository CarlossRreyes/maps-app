import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/apis';
import { Feature, PlacesResponse } from '@/interfaces/places';


const actions: ActionTree<PlacesState, StateInterface> = {
    // someAction( /*{ commit }, payload  */ ) {
    //     // a line to prevent linter errors
    // }
    getInitialLocation( { commit } ) {
        //TODO: LOADING
        navigator.geolocation.getCurrentPosition(
            ( {coords} ) => commit( 'setLngLat', { lng: coords.longitude, lat: coords.latitude } ),
            ( err ) => {
                console.log(err);
                throw new Error("No Geolocalización :(");                
            }
        );

        
        // navigator.geolocation.getCurrentPosition(
        //     ( {coords} ) => commit( 'setLngLat', coords ),
        //     ( err ) => {
        //         console.log(err);
        //         throw new Error("No Geolocalización :(");                
        //     }
        // );
    },

    async searchPlacesByTerm({ commit, state }, query: string ): Promise<Feature[]> {
        console.log("Query: ", query );

        //TODO: VALIDAR QUE REGRESE UN ARREGLO VACIO
        if( query.length  === 0 ){
            //TODO: SET PLACES 
            commit( "setPlaces", [] ); //TODO: COLOCAR ASI CUANDO SE ENCUENTRA DENTRO DEL MUSMO MODULO
            return [];
        }

        if( !state.userLocation ){
            throw new Error("No hay ubicación del usuario...")
        }

        commit( "setIsLoadingPlaces" );
        const resp = await  searchApi.get<PlacesResponse>(`/${ query }.json`, {
            params: {
                proximity: state.userLocation?.join(',')
            }
        })

        console.log(resp.data.features);

        commit( "setPlaces", resp.data.features );

        return resp.data.features;
        
        
    }
}



export default actions;