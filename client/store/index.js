import { createStore } from "vue";
import axios from "../axios";

export default createStore({
  state: {
    user: null,
    trips: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTrips(state, trips) {
      state.trips = trips;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await axios.post("/auth/register", userData);
        localStorage.setItem("token", response.data.token);
        commit("setUser", response.data.user);
      } catch (error) {
        console.error(error);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post("/auth/login", credentials);
        localStorage.setItem("token", response.data.token);
        commit("setUser", response.data.user);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTrips({ commit }) {
      try {
        const response = await axios.get("/trips", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        commit("setTrips", response.data.trips);
      } catch (error) {
        console.error(error);
      }
    },
    async createTrip({ commit }, tripData) {
      try {
        const response = await axios.post("/trips", tripData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        commit("setTrips", [...this.state.trips, response.data.trip]);
      } catch (error) {
        console.error(error);
      }
    },
    async updateTrip({ commit }, { tripId, tripData }) {
      try {
        const response = await axios.put(`/trips/${tripId}`, tripData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const updatedTrips = this.state.trips.map((trip) =>
          trip.id === tripId ? response.data.trip : trip
        );
        commit("setTrips", updatedTrips);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTrip({ commit }, tripId) {
      try {
        await axios.delete(`/trips/${tripId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const updatedTrips = this.state.trips.filter(
          (trip) => trip.id !== tripId
        );
        commit("setTrips", updatedTrips);
      } catch (error) {
        console.error(error);
      }
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("clearUser");
    },
  },
});
