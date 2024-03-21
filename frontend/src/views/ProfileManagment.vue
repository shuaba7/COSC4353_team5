<template>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client Profile Management</title>
</head>
<body>



    <h1>Client Profile Management</h1>
    <form id="profileForm">
        <div>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" maxlength="50" required value="John">
        </div>
        <div>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" maxlength="50" required value="Doe">
        </div>
        <div>
            <label for="address1">Address 1:</label>
            <input type="text" id="address1" name="address1" maxlength="100" required value="Address line 1">
        </div>
        <div>
            <label for="address2">Address 2:<span class="note">(Optional)</span> </label>             
            <input type="text" id="address2" name="address2" maxlength="100" value="Address line 2">

        </div>
        <div>
            <label for="city">City:</label>
            <input type="text" id="city" name="city" maxlength="100" required value="City">
        </div>
        <div>
            <label for="state">State:</label>
            <select id="state" name="state" required>
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
            <input type="text" id="zipcode" name="zipcode" pattern="\d*" minlength="5" maxlength="9" title="Please enter only numbers" required value="12345">
        </div>
        <div>
            <input type="submit" value="Submit">
        </div>
    </form>
</body>

<footer>
    <p>Joshua Batac | Christopher Le | Samuel Mlinka | Mohammed Noorani</p>
</footer>

</html>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
