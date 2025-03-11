<template>
  <div class="dashboard">
    <h1>Welcome, {{ user.name }}</h1>
    <button @click="logout">Logout</button>
    <h2>Your Trips</h2>
    <ul>
      <li v-for="trip in trips" :key="trip.id">
        <router-link :to="'/trip/' + trip.id">{{ trip.name }}</router-link>
        <button @click="deleteTrip(trip.id)">Delete</button>
      </li>
    </ul>
    <button @click="createNewTrip">Create New Trip</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user', 'trips']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    async deleteTrip(id) {
      await this.$store.dispatch('deleteTrip', id);
    },
    async createNewTrip() {
      // Prompt user for trip details and call createTrip action
    },
  },
  mounted() {
    this.$store.dispatch('fetchTrips');
  },
};
</script>
