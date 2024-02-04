<page backgroundColor="#5B484A">
    <actionBar title="Manage Account Settings" class="action-bar" backgroundColor="#8B5943"/>
    <stackLayout>
        <absoluteLayout height="40" top="20">
            <label text="Current Username: {thisUser.username}" color="white" top="20" left="15" fontSize="20"/>
        </absoluteLayout>
        <absoluteLayout height="60" top="40" >
            <textField bind:text="{ thisUser.username }" color="white" top="0" hint="New Username" editable="true" fontSize="20" height="40" textAlignment="left"/>
        </absoluteLayout>
        <absoluteLayout height="60" top="40" >
            <textField bind:text="{ newPw1 }" hint="New Password" top="0" editable="true" fontSize="20" height="40" textAlignment="left"/>
        </absoluteLayout>
        <absoluteLayout height="60" top="40">
            <textField bind:text="{ newPw2 }" hint="Confirm Password" top="0" editable="true" fontSize="20" height="40" textAlignment="left"/>
        </absoluteLayout>
        <absoluteLayout height="60" top="40">
            <textField bind:text="{ newEmail1 }" hint="New Email Address" top="0" editable="true" fontSize="20" height="40" textAlignment="left"/>
        </absoluteLayout>
        <absoluteLayout height="60" top="40">
            <textField bind:text="{ newEmail2 }" hint="Confirm Email Address" top="0" editable="true" fontSize="20" height="40" textAlignment="left"/>
        </absoluteLayout>
        <absoluteLayout height="60" top="40">
            <button text="Save Settings" on:tap="{ () => totalValidation(newPwValidation(newPw1, newPw2, thisUser), newEmailValidation(newEmail1, newEmail2, thisUser))}" top="0" left="-5" fontSize="20" color="white" textAlignment="center" backgroundColor="#5B484A"/> 
            {#if (validity == "valid")}
                <absoluteLayout height="40" top="100">
                    <button text="All fields valid. Tap here to close." on:tap="{ closeModal }" fontSize="20" color="white" textAlignment="center" height="20" top="0"/>
                </absoluteLayout>
            {:else if (validity == "password")}
                <absoluteLayout height="40" top="100" width="100%">
                    <label text="Invalid password, or passwords do not match." fontSize="15" color="white" width="100%" textAlignment="center" height="20" top="0"/>
                </absoluteLayout>
            {:else if (validity == "email")}
                <absoluteLayout height="40" top="100" width="100%">
                    <label text="Invalid email, or emails do not match." fontSize="15" color="white" height="20" width="100%" textAlignment="center" top="0"/>
                </absoluteLayout>
            {/if}
        </absoluteLayout>
    </stackLayout>
</page>


<script lang="ts">
    import { closeModal } from "svelte-native";

    import { UserSettings } from "./classes/UserSettings";

    let thisUser = new UserSettings;
    let newPw1 = "";
    let newPw2 = "";
    let newEmail1 = "";
    let newEmail2 = "";
    let validity = "";

    function newPwValidation(newPw1: string, newPw2: string, thisUser: UserSettings) {
        let validPw = false;
        if (newPw1 == newPw2) {
            if (newPw1.length >= 8) {
                validPw = true;
                thisUser.password = newPw1;
            }
        }
        return validPw;
    }

    function newEmailValidation(newEmail1: string, newEmail2: string, thisUser: UserSettings) {
        let validEmail = false;
        if (newEmail1 == newEmail2) {
            if (newEmail1.length >= 8) {
                validEmail = true;
                thisUser.emailAddress = newEmail1;
            }
        }
        return validEmail;
    }

    function totalValidation(pw: boolean, email: boolean) {
        let totalValid = false;
        if (pw && email) {
            totalValid = true;
        }
        if (totalValid) {
            validity = "valid";
        } else {
            if (!pw) {
                validity = "password";
            } else if (!email) {
                validity = "email";
            }
        }
        return validity;
    }

</script>