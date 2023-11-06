<frame>
    <page backgroundColor="#5B484A">
        <actionBar title="Sign In" class="action-bar" backgroundColor="#8B5943"/>
        <stackLayout orientation="vertical">
            <textField bind:text="{ thisUser.username }" hint="Username" editable="true" fontSize="20" height="40" textAlignment="center"/>
            <textField bind:text="{ thisUser.password }" hint="Password" editable="true" fontSize="20" height="40" textAlignment="center"/>
            <button class="signInButton" text="Sign In" on:tap="{ () => closeModal("done") }" fontSize="20" color="white" textAlignment="center" backgroundColor="#8B5943"/>
            <button text="Register" on:tap="{ () => closeModal("register")}" fontSize="20" color="white" textAlignment="center" backgroundColor="#5B484A"/>

        </stackLayout>
    </page>
</frame>

<script lang="ts">
    import { closeModal } from "svelte-native";
    
    import { UserSettings } from "./classes/UserSettings";

    let thisUser = new UserSettings;

</script>

<style>
    .signInButton {
        
        border-radius: 10;
    }
</style>