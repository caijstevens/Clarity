<!--  -->
<page backgroundColor="#5B484A">
    <actionBar title="Edit Profile" backgroundColor="#8B5943"/>
    <stackLayout>
        <absoluteLayout>
            <label text="Current Nickname: {thisUser.userNickname}" left="15" top="10" fontSize="20" height="40" color="white"/>
            <textField hint="New Nickname " editable="true" bind:text="{thisUser.userNickname}" top="40" fontSize="20" height="40" color="white"/>
        </absoluteLayout>
        
    </stackLayout>
</page>


<script lang="ts">
    import { UserSettings } from "./classes/UserSettings";	
    import ProfileColourPicker from "./ProfileColourPicker.svelte"
    import { PropertyChangeData } from "@nativescript/core";
    import { showModal } from 'svelte-native';
    import thisUser from "/Home.svelte";
    

</script>

<style>
   
</style>