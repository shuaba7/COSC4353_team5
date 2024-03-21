<template>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login and Registration Forms</title>

    </head>

    <body>

        <!-- Login Form -->
        <div id="login-form">
            <h1>Login</h1>
            <form action="/login" method="post">
                <!-- Update the action URL as needed -->
                <div>
                    <label for="login-username">Username:</label>
                    <input type="text" id="login-username" name="username" required>
                </div>
                <div>
                    <label for="login-password">Password:</label>
                    <input type="password" id="login-password" name="password" required>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <div>
                    Not a client yet? <a href="#register-form">Register here</a>
                </div>
            </form>
        </div>

        <!-- Client Registration Form -->
        <div id="register-form">
            <h1>Registration</h1>
            <form action="/register" method="post">
                <!-- Update the action URL as needed -->
                <div>
                    <label for="register-username">Username:</label>
                    <input type="text" id="register-username" name="username" required>
                </div>
                <div>
                    <label for="register-password">Password:</label>
                    <input type="password" id="register-password" name="password" required>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>

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
