<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Client Profile Management</title>
    </head>
    <body>
      <h1>Client Profile Management  (ID#: {{ $route.params.ClientID }})</h1>
      <form id="profileForm" @submit.prevent="submitForm">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" maxlength="50" required v-model="formData.firstName">
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" maxlength="50" required v-model="formData.lastName">
        </div>
        <div>
          <label for="address1">Address 1:</label>
          <input type="text" id="address1" name="address1" maxlength="100" required v-model="formData.address1">
        </div>
        <div>
          <label for="address2">Address 2:<span class="note">(Optional)</span> </label>             
          <input type="text" id="address2" name="address2" maxlength="100" v-model="formData.address2">
        </div>
        <div>
          <label for="city">City:</label>
          <input type="text" id="city" name="city" maxlength="100" required v-model="formData.city">
        </div>
        <div>
          <label for="state">State:</label>
          <select id="state" name="state" required v-model="this.formData.state">
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>
        </div>
        <div>
          <label for="zipcode">Zipcode:</label>
          <input type="text" id="zipcode" name="zipcode" pattern="\d*" minlength="5" maxlength="9" title="Please enter only numbers" required v-model="formData.zipcode">
        </div>
        <div>
          <input type="submit" value="Submit">
        </div>
      </form>
    </body>
  </html>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        userId: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      userId: this.$route.params.ClientID // TESTING ID
    };
  },
  created() {
    // Fetch user information when the component is created
    this.fetchUserInformation();
  },
  methods: {
    async fetchUserInformation() {
      try {
        const response = await axios.get(`http://localhost:3000/user-information/${this.userId}`); // LOCALHOSTING BACKEND
        this.formData = response.data;
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    },
    async submitForm() {
      try {
        // Make a PUT request to update the user information
        await axios.put(`http://localhost:3000/update-user-information/${this.userId}`, this.formData);
        console.log('User information updated successfully!');
        alert("Successfully made changes, please relog to view changes");
        window.location.reload();
        
      } catch (error) {
        console.error('Error updating user information:', error);
      }
    }
  }
}
</script>

<style scoped>
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
</style>
