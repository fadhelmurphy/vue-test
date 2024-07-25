<template>
    <h2 v-if="store.loading">Loading...</h2>
    <LMap v-else style="height: 100vh;" :zoom="zoom" :center="center" @ready="onMapReady">
      <LTileLayer :url="url" />
    </LMap>
  </template>
  
  <script>
  import { ref, onMounted, watchEffect } from 'vue';
  import { useMapStore } from '../stores/mapStore';
  import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; 
  import 'leaflet.markercluster'; 
  
  export default {
    name: 'MapComponent',
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup
    },
    setup() {
      const store = useMapStore();
      const center = ref([0, 0]);
      const zoom = ref(5); 
      const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  
      onMounted(() => {
        store.fetchLocations();
      });
  
      watchEffect(() => {
        if (store.locations.length > 0) {
          const latLngs = store.locations.map(loc => [loc.latitude, loc.longitude]);
          if (latLngs.length > 0) {
            const bounds = L.latLngBounds(latLngs);
            center.value = bounds.getCenter();
            zoom.value = 5; 
          }
        }
      });
  
      const onMapReady = (map) => {
        const markers = L.markerClusterGroup(); // Create a marker cluster group
  
        store.locations.forEach(location => {
          const marker = L.marker([location.latitude, location.longitude]);
          marker.bindPopup(`<b>${location.name}</b>`);
          markers.addLayer(marker);
        });
  
        map.addLayer(markers); // Add the marker cluster group to the map
      };
  
      const addRandomLocation = async () => {
        const newLocation = {
          latitude: Math.random() * 180 - 90,
          longitude: Math.random() * 360 - 180,
          name: `Random Location ${Math.floor(Math.random() * 1000)}`
        };
        await store.addLocation(newLocation);
      };
  
      return { store, center, zoom, url, addRandomLocation, onMapReady };
    }
  };
  </script>
  
  <style>
  #map {
    width: 100%;
    height: 100vh; 
  }
  </style>
  