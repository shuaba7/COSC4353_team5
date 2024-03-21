<template>
  <div>
    <nav>
      <div class="nav-center">
        <router-link to="/" class="a">Home</router-link>|
        <router-link to="/ProfileManagment" class="a">Manage Profile </router-link>
      </div>
      </nav>
  </div>

    <router-view></router-view>
</template>


<script>
export default {
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

  /* from Quote History */

  .title {
    text-align: center;
  }

  .quote-table {
    width: 80%;
    margin: 0 auto;
    border-collapse: collapse;
  }

  .quote-table th,
  .quote-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .quote-table th {
    background-color: #f2f2f2;
  }



  /* Form styles */
  form {
    width: 50%;
    margin: 0 auto;
  }

  form div {
    margin-bottom: 15px;
  }

  form label {
    display: block;
    font-weight: bold;
  }

  form input[type="text"],
  form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  form input[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  form input[type="submit"]:hover {
    background-color: #45a049;
  }

  .note {
    font-style: italic;
    color: #666;
    margin-left: 5px;
  }


  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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
    /* Remove underline from all router links and buttons */
  }

  .a:hover {
    color: gray;
  }

  .router-link-exact-active {
    color: #b94242;
  }

</style>
