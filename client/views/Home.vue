<template>
  <div class="auth-container">
    <h1>Road Trip Planner</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      const credentials = { email: this.email, password: this.password };
      await this.$store.dispatch('login', credentials);
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style scoped>
/* Add styles for login form */
</style>
