<template>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote History</title>
    </head>

    <body>


        <h1 class="title">Quote History</h1>
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
                <!-- Table rows will be filled dynamically with data from the NoSQL database -->
            </tbody>
        </table>
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