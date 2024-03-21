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
        <nav>
          <table>
            <tr>
              <td><a href="index.html">Home</a></td>
              <td>|</td>
              <td><a href="ProfileManagement.html">Profile Management</a></td>
              <td>|</td>
              <td><a href="QuoteHistory.html">Quote History</a></td>
              <td>|</td>
              <td><a href="FuelQuote.html">Fuel Quote</a></td>
              <td>|</td>
              <td><a href="LoginClientRegistration.html"> Login </a></td>
            </tr>
          </table>
        </nav>
    
        <h1 class="title">Quote History</h1>
        <table class="table">
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
              <td>{{ entry.GallonsRequested }}</td>
              <td>{{ entry.DeliveryAddress }}</td>
              <td>{{ entry.DeliveryDate }}</td>
              <td>{{ entry.SuggestedPrice }}</td>
              <td>{{ entry.AmountDue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    
    </body>
    </html>
    </template>

<script src="http://localhost:3000/user-information/${this.userId}"></script>
<script>
  new Vue({
    el: '#app',
    data() {
      return {
        quoteHistory: []
      };
    },
    mounted() {
      this.fetchQuoteHistory();
    },
    methods: {
      fetchQuoteHistory() {
        fetch('/api/quote-history')
          .then(response => response.json())
          .then(data => {
            this.quoteHistory = data;
          })
          .catch(error => {
            console.error('Error fetching quote history:', error);
          });
      }
    }
  });
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