import { defineStore } from 'pinia';
import { apolloClient } from '../apolloClient';
import { gql } from '@apollo/client/core';

const GET_LOCATIONS = gql`
  query Locations {
    locations {
      id
      latitude
      longitude
      name
    }
  }
`;

const INSERT_LOCATION = gql`
  mutation InsertLocation($object: locations_insert_input!) {
    insert_locations_one(object: $object) {
      id
      latitude
      longitude
      name
    }
  }
`;

const UPDATE_LOCATION = gql`
  mutation UpdateLocation($id: ID!, $set: locations_set_input!) {
    update_locations_by_pk(pk_columns: {id: $id}, _set: $set) {
      id
      latitude
      longitude
      name
    }
  }
`;

const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: ID!) {
    delete_locations_by_pk(id: $id) {
      id
    }
  }
`;

export const useMapStore = defineStore('mapStore', {
  state: () => ({
    locations: [],
    loading: false,
    error: null,
    notfound: false,
  }),
  actions: {
    async fetchLocations() {
      this.loading = true;
      this.error = null;
      this.notfound = false;

      try {
        const { data } = await apolloClient.query({ query: GET_LOCATIONS });
        if (data.locations.length === 0) {
          this.notfound = true;
        } else {
          this.locations = data.locations;
        }
      } catch (err) {
        this.error = err.message || 'Error fetching locations';
      } finally {
        this.loading = false;
      }
    },

    async addLocation(location) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await apolloClient.mutate({
          mutation: INSERT_LOCATION,
          variables: { object: location }
        });
        this.locations.push(data.insert_locations_one);
      } catch (err) {
        this.error = err.message || 'Error adding location';
      } finally {
        this.loading = false;
      }
    },

    async updateLocation(id, set) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await apolloClient.mutate({
          mutation: UPDATE_LOCATION,
          variables: { id, set }
        });
        const index = this.locations.findIndex(loc => loc.id === id);
        if (index !== -1) {
          this.locations[index] = data.update_locations_by_pk;
        }
      } catch (err) {
        this.error = err.message || 'Error updating location';
      } finally {
        this.loading = false;
      }
    },

    async deleteLocation(id) {
      this.loading = true;
      this.error = null;

      try {
        await apolloClient.mutate({
          mutation: DELETE_LOCATION,
          variables: { id }
        });
        this.locations = this.locations.filter(loc => loc.id !== id);
      } catch (err) {
        this.error = err.message || 'Error deleting location';
      } finally {
        this.loading = false;
      }
    }
  }
});
