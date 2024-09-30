<template>
  <MapView />

  <SearchBarView></SearchBarView>
  <MyLocationBtn></MyLocationBtn>
  <TripDetailsVue></TripDetailsVue>


</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePlacesStore } from '@/composables'
import MapView from '@/components/mapview/MapView.vue';
// import SearchBar from '@/components/searchbar/SearchBar.vue'; '@/components/searchbar/SearchBar.vue';
import MyLocationBtn from '@/components/my-location-btn/MyLocationBtn.vue';
import SearchBarView from '@/components/searchbar/SearchBar.vue';
import TripDetailsVue from '@/components/trip-details/TripDetails.vue';



export default defineComponent({
  name: 'HomeView',
  components: { MapView, MyLocationBtn, SearchBarView, TripDetailsVue },

  setup(){
    
    usePlacesStore();
  }
});
</script>
