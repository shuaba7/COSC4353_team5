<template>

  <div>
    <nav>
      <div class="nav-center">
        <router-link to="/" class="a">Home</router-link>
        <div v-if="ClientID == -1">
          <button @click="ToggleLoginForm" class="a">Log In</button>     
        </div>
        <div v-else>
          <router-link :to="{name: 'ProfileManagment', params: {ClientID: this.ClientID} }" > Manage Profile </router-link>
          <router-link :to="{name: 'FuelQuote', params: {ClientID: this.ClientID} }" > Fuel Quote </router-link>
          <router-link :to="{name: 'QuoteHistory', params: {ClientID: this.ClientID} }" > Quote History </router-link>
          <button @click="signOut" class = "a">SIGN OUT</button>
        </div>

        <div v-if="showLogin">
          <LoginClientRegistration @updateID="updateID"/>
          </div>



      </div>
    </nav>
  </div>
  <footer>
    <p>Joshua Batac | Christopher Le | Samuel Mlinka | Mohammed Noorani</p>
  </footer>
  <router-view></router-view>

</template>

<script>
import LoginClientRegistration from './views/profile/LoginClientRegistration.vue';
export default {
  data() {
    return {
      showLogin: false,
      ClientID: -1
      , // -1, not logged in  
    };
  },
  components: {
    LoginClientRegistration
  },
  methods: {
    ToggleLoginForm() {
      this.showLogin = !this.showLogin;
    },
    updateID(id) {
      this.ClientID = id;
      this.ToggleLoginForm();
    },
    signOut() {
      this.ClientID = -1;
      this.$router.push('/'); 
    }
  }
}
</script>

<style>
  /* General styles */
  body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

nav {
  background-color: #333;
  color: #fff;
  padding: 10px;
}

nav a, button {
  color: #fff;
  background-color: transparent;
  border: none;
  text-decoration: none;
  padding: 5px 10px;
  font-weight: bold;
  transition: color .15s, background-color .15s;
}

nav a:hover, button:hover {
  background-color: #555;
  cursor: pointer;
}

h1 {
  text-align: center;
  margin-top: 50px;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  position: fixed;
  width: 100%;
  bottom: 0;
}

footer p {
  margin: 0;
}

nav {
  background-color: #333;
  padding: 15px;
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-center {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
}

.a, .router-link-exact-active {
  margin-right: 10px;
  text-decoration: none;
}

.a:hover, button:hover {
  color: gray;
}

.router-link-exact-active {
  color: #b94242;
}
</style>
