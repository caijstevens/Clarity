<frame>
    <page backgroundColor="#5B484A">
        <actionBar title="Sign In" class="action-bar" backgroundColor="#8B5943"/>
        <stackLayout orientation="vertical">
            <textField bind:text="{ username }" hint="Create Username" editable="true" fontSize="20" height="40" textAlignment="center"/>
            <textField bind:text="{ email }" hint="Email Address" editable="true" fontSize="20" height="40" textAlignment="center"/>
            <textField bind:text="{ confirmEmail }" hint="Confirm Email Address" editable="true" fontSize="20" height="40" textAlignment="center"/>
            <textField bind:text="{ password }" hint="Password" editable="true" fontSize="20" height="40" textAlignment="center"/>
            <textField bind:text="{ confirmPassword }" hint="Confirm Password" editable="true" fontSize="20" height="40" textAlignment="center"/>
            <button class="registerButton" text="Register" on:tap="{ () => processRegistration(email, confirmEmail, password, confirmPassword)}" fontSize="20" color="white" textAlignment="center" backgroundColor="#8B5943"/>
            <button text="I already have an account." on:tap="{ () => closeModal("login")}" fontSize="20" color="white" textAlignment="center" backgroundColor="#5B484A"/>

        </stackLayout>
    </page>
</frame>

<script lang="ts">
    import { closeModal } from "svelte-native";
    let username = "";
    let password = "";
    let email = "";
    let confirmEmail = "";
    let confirmPassword = "";

    function checkMatch(email1: string, email2: string, pw1: string, pw2: string) {
        if ((email1 == email2) && (pw1 == pw2)) {
            return true;
        }
    }

    function processRegistration(email1: string, email2: string, pw1: string, pw2: string) {
        let valid = checkMatch(email1, email2, pw1, pw2);
        console.log(valid);
    }

</script>

<style>
    .registerButton {
        
        border-radius: 10;
    }
</style>