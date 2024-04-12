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
   <form id="fuelQuoteForm">
       <div>
           <label for="gallonsRequested">Gallons Requested:</label>
           <input type="number" id="gallonsRequested" name="gallonsRequested" required min="0" v-model="this.userData.gallonsRequested">
       </div>
       <div>
           <label for="deliveryAddress">Delivery Address:</label>
           <input type="text" id="deliveryAddress" name="deliveryAddress" readonly v-model="this.userData.deliveryAddress">
       </div>
       <div>
           <label for="deliveryDate">Delivery Date:</label>
           <input type="date" id="deliveryDate" name="deliveryDate" required v-model="this.userData.deliveryDate">
       </div>
       <button @click.prevent="getFuelPrice" style="margin-bottom: 75px;">Submit</button>
       <div>
           <label for="suggestedPrice">Suggested $ / Gallon:</label>
           <input type="text" id="suggestedPrice" name="suggestedPrice" readonly v-model="this.userData.suggestedPrice">
       </div>
       <div>
           <label for="totalAmountDue">Total Amount Due:</label>
           <input type="text" id="totalAmountDue" name="totalAmountDue" readonly v-model="this.userData.totalAmount">
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
                userId: '',
                gallonsRequested: 0,
                deliveryAddress: '',
                deliveryDate: '',
                suggestedPricePerGallon: 'test',
                totalAmountDue: ''
            },
            userId: 1 //TEMPORARY HARD CODED USER ID
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
                date: this.deliveryDate,
                gallons: this.gallonsRequested
                });
                this.userData.suggestedPricePerGallon = response.data.suggestedPricePerGallon;
                this.userData.totalAmountDue = response.data.totalAmountDue;
                //this.userData.totalAmountDue = this.userData.suggestedPricePerGallon * this.userData.gallonsRequested;
            }
            catch(error) {
                console.error('Error calculating price: ', error);
            }
        },
        async updateHistory() {
            try {
                //const combinedData = Object.assign({userId: this.userId}, this.userData);
                const response = await axios.put(`http://localhost:3000/user-fuel-quote/${this.userId}`, this.userData); 
                console.log(response);
                
            } catch (error) {
                console.error('Error retrieving address:', error);
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

.note {
    font-style: italic;
    color: #666;
    margin-left: 5px;
}


</style>