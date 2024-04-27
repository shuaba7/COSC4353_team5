<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quote History</title>
    </head>
    <body>
      <div id="quote_History">
        <h1 class="title">Quote History for User # {{ this.userID }}</h1>
        <table class="quote-table">
          <thead>
            <tr>
              <th>Gallons Requested</th>
              <th>Delivery Address</th>
              <th>Delivery Date</th>
              <th>Suggested Price/Gallon</th>
              <th>Total Amount Due</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in quoteHistory" :key="entry.id">
              <td>{{ entry.gallonsRequested }}</td>
              <td>{{ entry.deliveryAddress }}</td>
              <td>{{ entry.deliveryDate }}</td>
              <td>{{ entry.suggestedPricePerGallon }}</td>
              <td>{{ entry.totalAmountDue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="deleteLastFuelEntry">Delete Last Fuel Entry</button> 
    </body>
  </html>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      quoteHistory: [],
      userID: this.$route.params.ClientID    
    };
  },
  created() {
    this.getUserFuelHistory();
  },
  methods: {
   async getUserFuelHistory() {
      axios.get(`http://localhost:3000/user-fuel-history/${this.userID}`)
        .then(response => {
          this.quoteHistory = response.data;
        })
        .catch(error => {
          console.error('Error fetching user fuel history:', error);
        });
    }
    async deleteLastFuelEntry() {
        try {
          const response = await axios.delete(`http://localhost:3000/delete-last-fuel-entry/${this.userID}`);
          alert(response.data.message); // Display response message in an alert
          this.getUserFuelHistory(); // Refresh the fuel history after deletion
        } catch (error) {
          console.error('Error deleting last fuel entry:', error);
          alert('An error occurred while deleting the fuel entry.');
        }
    }
  }
};
</script>

<style scoped>
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
</style>


<style scoped>
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
</style>
