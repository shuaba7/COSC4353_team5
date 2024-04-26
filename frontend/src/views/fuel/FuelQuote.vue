<template>
    <!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Fuel Quote Form</title>
</head>

<body>

   <h1>Fuel Quote Form</h1>
   <form id="fuelQuoteForm" @submit.prevent="updateHistory" :disabled="!userData.totalAmountDue">
       <div>
           <label for="gallonsRequested">Gallons Requested:</label>
           <input type="number" id="gallonsRequested" name="gallonsRequested" required min="0" v-model="userData.gallonsRequested">
       </div>
       <div>
           <label for="deliveryAddress">Delivery Address:</label>
           <input type="text" id="deliveryAddress" name="deliveryAddress" readonly v-model="userData.deliveryAddress">
       </div>
       <div>
           <label for="deliveryDate">Delivery Date:</label>
           <input type="date" id="deliveryDate" name="deliveryDate" required v-model="userData.deliveryDate">
       </div>
       <div>
            <input type="button" value="Get Quote" @click.prevent="getFuelPrice" :disabled="!userData.deliveryDate">
       </div>
       <div>
           <label for="suggestedPrice">Suggested $ / Gallon:</label>
           <input type="text" id="suggestedPrice" name="suggestedPrice" readonly v-model="userData.suggestedPricePerGallon">
       </div>
       <div>
           <label for="totalAmountDue">Total Amount Due:</label>
           <input type="text" id="totalAmountDue" name="totalAmountDue" readonly v-model="userData.totalAmountDue">
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
            
            userData: {
                userId: null,
                gallonsRequested: 0,
                deliveryAddress: null,
                deliveryDate: null,
                suggestedPricePerGallon: null,
                totalAmountDue: null
            },
            userId: this.$route.params.ClientID 
        };
    },

    created() {
        this.getAddress();
    },

    methods: {
        async getAddress() {
            try {
                const response = await axios.get(`http://localhost:3000/user-fuel-quote/${this.userId}`); 
                this.userData.userId = response.data.userId;
                this.userData.deliveryAddress = response.data.address;
            } catch (error) {
                console.error('Error retrieving address:', error);
            }
        },
        async getFuelPrice() {
            try {
                const response = await axios.post(`http://localhost:3000/user-fuel-quote/${this.userId}`, {
                gallons: this.userData.gallonsRequested
                });

                //console.log('API Response:', response.data); //For debugging purposes

                this.userData.suggestedPricePerGallon = response.data.suggestedPrice;
                this.userData.totalAmountDue = response.data.totalAmount;

                //await this.updateHistory();
            }
            catch(error) {
                console.error('Error calculating price: ', error);
            }
        },
        async updateHistory() {
            try {
                const response = await axios.put(`http://localhost:3000/user-fuel-quote/${this.userId}`, {userData: this.userData}); 
                console.log(response.data);
                alert("Successfully saved quote");
                
            } catch (error) {
                console.error('Error updating history:', error);
            }
        }
    }
};
</script>

<style scoped>

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

form input[type="button"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

form input[type="button"]:hover {
    background-color: #45a049;
}

.note {
    font-style: italic;
    color: #666;
    margin-left: 5px;
}

.btn {
        padding: 10px 20px;
        background-color: #4CAF50; /* Green */
        color: white;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s; /* Transition effect on background-color */
    }


</style>