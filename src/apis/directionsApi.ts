import axios from "axios";


const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: "geojson",
        overview: "simplified",
        steps: false,

        access_token: 'pk.eyJ1IjoiY2FybG9zc3JyZXllczk3IiwiYSI6ImNsb2ptMGw1MDBjMTAyanFvZ255MjQwb2IifQ.CpXIX2ZPqNyn864Im3ZNUg',


    }
})

export default directionsApi;