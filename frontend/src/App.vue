<template>

  <div>
    <nav>
      <div class="nav-center">
        <router-link to="/" class="a">Home</router-link>
        <div v-if="ClientID == -1">
          <router-link to="/loginClientRegistration" class="a">Log In</router-link>
        </div>

        <div v-else>
          <router-link :to="{name: 'ProfileManagment', params: {ClientID: this.ClientID} }" > Manage Profile </router-link>
          <router-link :to="{name: 'FuelQuote', params: {ClientID: this.ClientID} }" > Fuel Quote </router-link>
          <router-link :to="{name: 'QuoteHistory', params: {ClientID: this.ClientID} }" > Quote History </router-link>
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
export default {
  data() {
    return {
      ClientID: 2
      , // -1, not logged in  
    };
  },
  components: {

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

  nav a {
    color: #fff;
    text-decoration: none;
    padding: 5px 10px;
  }

  nav a:hover {
    background-color: #555;
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

  .a,
  .router-link-exact-active {
    font-weight: bold;
    color: #ffffff;
    margin-right: 10px;
    transition: color .15s;
    text-decoration: none;
  }

  .a:hover {
    color: gray;
  }

  .router-link-exact-active {
    color: #b94242;
  }

</style>
