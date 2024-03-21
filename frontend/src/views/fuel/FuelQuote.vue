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
           <input type="number" id="gallonsRequested" name="gallonsRequested" required min="1">
       </div>
       <div>
           <label for="deliveryAddress">Delivery Address:</label>
           <input type="text" id="deliveryAddress" name="deliveryAddress" readonly>
       </div>
       <div>
           <label for="deliveryDate">Delivery Date:</label>
           <input type="date" id="deliveryDate" name="deliveryDate" required>
       </div>
       <div>
           <label for="suggestedPrice">Suggested $ / Gallon:</label>
           <input type="text" id="suggestedPrice" name="suggestedPrice" readonly>
       </div>
       <div>
           <label for="totalAmountDue">Total Amount Due:</label>
           <input type="text" id="totalAmountDue" name="totalAmountDue" readonly>
       </div>
       <button type="submit">Submit</button>
   </form>
</body>
</html>

</template>

<script>
export default {
    setup() {
        
    },
}
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