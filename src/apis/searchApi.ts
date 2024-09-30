import axios from "axios";


const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: "es",
        access_token: 'pk.eyJ1IjoiY2FybG9zc3JyZXllczk3IiwiYSI6ImNsb2ptMGw1MDBjMTAyanFvZ255MjQwb2IifQ.CpXIX2ZPqNyn864Im3ZNUg',


    }
})

export default searchApi;