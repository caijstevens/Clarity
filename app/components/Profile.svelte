<page>
    <actionBar title="Profile">
        <navigationButton text="Back" android.systemIcon="ic_menu_back" on:tap="{ goBack }"/>
    </actionBar>
    <dockLayout class="home" stretchLastChild="true" backgroundColor="#E3E1E6">
        <absoluteLayout dock="top" height="160" backgroundColor="#E1D1B9">
            <label text="Hi, {thisUser.userNickname}!" height="40" width="100%" textAlignment="center" color="white" fontSize="20"/>
            <label text="@{thisUser.username}" height="20" width="100%" top="40" textAlignment="center" color="white" fontSize="12"/>
            <button class="profilePicture" text="P" height="80" width="80" top="60" left="140" backgroundColor="{thisUser.profileColour}"/>
        </absoluteLayout>

        
        <stackLayout dock="top" orientation="vertical" top="0" height="100%" backgroundColor="#D9Bf9D">
            <absoluteLayout height="40">
                <button text="Edit Profile" on:tap="{ editProfilePage }"height="40" width="95%" left="-7"/>
            </absoluteLayout>
            <absoluteLayout height="40" top="5">
                <button text="Account Settings" on:tap="{ accountSettingsPage }"top="5" height="40" width="95%" left="-7"/>
            </absoluteLayout>
            <absoluteLayout height="40" top="5">
                <button text="Manage Categories" on:tap="{ manageCategoriesPage }"top="10" height="40" width="95%" left="-7"/>
            </absoluteLayout>
            <absoluteLayout height="40" top="5">
                <button text="Manage Routine Preferences" on:tap="{ manageRoutinePreferencesPage }" top="15" height="40" width="95%" left="-7"/>
            </absoluteLayout>
        </stackLayout>
        <label dock="bottom" height="1" backgroundColor="#E3E1E6"/>  
    </dockLayout>
</page>

<script lang="ts">
    import { goBack } from 'svelte-native';
    import { navigate } from 'svelte-native';

    import EditProfile from "./EditProfile.svelte";
    import AccountSettings from "./AccountSettings.svelte";
    import ManageCategories from "./ManageCategories.svelte";
    import ManageRoutinePreferences from "./ManageRoutinePreferences.svelte";
    import { UserSettings } from "./classes/UserSettings";

    export let thisUser = new UserSettings;

    function editProfilePage() {
        navigate ({
            page: EditProfile,
            props: {    
            }
        })
    }

    function accountSettingsPage() {
        navigate ({
            page: AccountSettings,
            props: {  
            }
        })
    }

    function manageCategoriesPage() {
        navigate ({
            page: ManageCategories,
            props: {    
            }
        })
    }

    function manageRoutinePreferencesPage() {
        navigate ({
            page: ManageRoutinePreferences,
            props: {  
            }
        })
    }


</script>

<style>
    .profilePicture {
        border-radius: 40;
    }
</style>