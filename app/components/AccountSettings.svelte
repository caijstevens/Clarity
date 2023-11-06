<frame>
    <page>
        <actionBar title="Manage Account Settings" class="action-bar" backgroundColor="#8B5943">
            <actionItem
            on:tap="{closeModal}" ios.systemIcon="14" ios.position="right" android.systemIcon="ic_menu_close_clear_cancel" android.position="actionBar"/> 
        </actionBar>
        <absoluteLayout height="80">
            <label text="Current Username: {thisUser.username}"/>
            <textField bind:text="{ thisUser.username }" hint="New Username" editable="true" fontSize="20" height="40" textAlignment="left"/>
        </absoluteLayout>
        <absoluteLayout height="80">
            <textField bind:text="{ newPw1 }" hint="New Password" editable="true" fontSize="20" height="40" textAlignment="left"/>
            <textField bind:text="{ newPw2 }" hint="Confirm Password" editable="true" fontSize="20" height="40" textAlignment="left"/>
        </absoluteLayout>
        <absoluteLayout height="80">
            <textField bind:text="{ newEmail1 }" hint="New Email Address" editable="true" fontSize="20" height="40" textAlignment="left"/>
            <textField bind:text="{ newEmail2 }" hint="Confirm Email Address" editable="true" fontSize="20" height="40" textAlignment="left"/>
        </absoluteLayout>
        <absoluteLayout height="80">
            <button text="Save Settings" on:tap="{ () => totalValidation(newPwValidation(newPw1, newPw2, thisUser), newEmailValidation(newEmail1, newEmail2, thisUser))}" fontSize="20" color="white" textAlignment="center" backgroundColor="#5B484A"/> 
            {#if (validity == "valid")}
                <absoluteLayout height="80">
                    <button text="All fields valid. Tap here to close." on:tap="{ closeModal }" fontSize="20" color="white" textAlignment="center"/>
                </absoluteLayout>
            {:else if (validity == "password")}
                <absoluteLayout height="80">
                    <label text="Invalid password, or passwords do not match." fontSize="20" color="white" textAlignment="center"/>
                </absoluteLayout>
            {:else if (validity == "email")}
                <absoluteLayout height="80">
                    <label text="Invalid email, or emails do not match." fontSize="20" color="white" textAlignment="center"/>
                </absoluteLayout>
            {/if}
        </absoluteLayout>
    </page>
</frame>

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