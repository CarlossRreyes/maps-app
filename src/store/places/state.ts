import { Feature } from "@/interfaces/places";

export interface PlacesState {
    isaloading: boolean;
    userLocation?: [ number, number ];
    isLoadingPlaces: boolean;
    places: Feature[];
}

function state(): PlacesState {
    return {
        isaloading: true,
        userLocation: undefined,
        isLoadingPlaces: false,
        places: [],
    }
}

export default state;