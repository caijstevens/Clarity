<frame>
    <page backgroundColor="#5B484A">
        <stackLayout>
            <absoluteLayout>
                <label text="Current Nickname: {thisUser.userNickname}" fontSize="20" height="40" color="white"/>
                <textField hint="New Nickname: " editable="true" bind:text="{thisUser.userNickname}" fontSize="20" height="40" color="white"/>
            </absoluteLayout>
            <absoluteLayout>
                <button class="profilePicture" on:tap="{ toggleColoursOn }" text="P" height="80" width="80" top="60" left="140"/>
            </absoluteLayout>
            {#if coloursOn == true}
                <absoluteLayout height="50">
                </absoluteLayout>
            {/if}
        </stackLayout>
    </page>
</frame>

<script lang="ts">
    import { UserSettings } from "./classes/UserSettings";	
    import { PropertyChangeData } from "@nativescript/core";


    export let thisUser = new UserSettings;
    let coloursOn = false;
   
    function toggleColoursOn() {
        if (!coloursOn) {
            coloursOn;
        } else {
            coloursOn = false;
        }
    }

    function profileColourInput(data: PropertyChangeData) {
        thisUser.onProfileColourChanged(data.value);
    }

</script>

<style>
    .profilePicture {
        border-radius: 40;
    }
</style>