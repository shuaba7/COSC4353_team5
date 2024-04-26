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
            <form @submit.prevent="submitLogin">
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="loginData.username" required>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="loginData.password" required>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>

        <!-- Client Registration Form -->
        <div id="register-form">
            <h1>Registration</h1>
            <form @submit.prevent="submitRegister">
                <div>
                    <label for="register-username">Username:</label>
                    <input type="text" id="register-username" v-model="registerData.username" required>
                </div>
                <div>
                    <label for="register-password">Password:</label>
                    <input type="password" id="register-password" v-model="registerData.password" required>
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
import axios from 'axios';

export default {
    data() {
        return {
            loginData: {
                username: '',
                password: ''
            },
            registerData: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        async submitLogin() {
            try {
                const response = await axios.post('http://localhost:3000/login', this.loginData);
                // Handle response, e.g., storing tokens, redirecting, etc.
                console.log(response.data);
            } catch (error) {
                console.error('Login error:', error);
            }
        },
        async submitRegister() {
            try {
                const response = await axios.post('http://localhost:3000/register', this.registerData);
                // Handle response, such as logging in the user or displaying messages
                console.log(response.data);
            } catch (error) {
                console.error('Registration error:', error);
            }
        }
    }
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
