<frame>
    <page>
        <actionBar title="Manage Routine Preferences" class="action-bar" backgroundColor="#8B5943">
            <actionItem
            on:tap="{closeModal}"
            ios.systemIcon="14" ios.position="right"
            android.systemIcon="ic_menu_close_clear_cancel" android.position="actionBar"
            /> 
        </actionBar>
        <absoluteLayout height="80">
            <label text="Average Schedule Start Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
            <timePicker time="{ settings.scheduleStart }" on:timeChange="{ scheduleStartInput }" width="90%" height="100%"/>
            <label text="Average Schedule End Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
            <timePicker time="{ settings.scheduleEnd }" on:timeChange="{ scheduleEndInput }" width="90%" height="100%"/>
        </absoluteLayout>
        <absoluteLayout height="40">
            <label text="Maximum Concentration Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15"/>
            <listPicker items="{ focusLengthList }" on:selectedIndexChange="{ focusLengthInput }" width="90%" height="100%"/>
        </absoluteLayout>
    </page>
</frame>

<script lang="ts">
    // Imports for the necessary classes and functions.
    import { closeModal } from "svelte-native";
    import { PropertyChangeData } from "@nativescript/core";

    import { UserSettings } from "./classes/UserSettings";
    
    let settings: UserSettings;
    let focusLengthList: String[] = ["30 mins", "60 mins", "90 mins", "120 mins", "150 mins"]

    function forceUpdate() {
        settings = settings;
    }

    function scheduleStartInput(data: PropertyChangeData) {
        settings.changeScheduleStart(data.value);
        forceUpdate();
    }

    function scheduleEndInput(data: PropertyChangeData) {
        settings.changeScheduleEnd(data.value);
        forceUpdate();
    }

    function focusLengthInput(data: PropertyChangeData) {
        settings.changeFocusLength(data.value);
        forceUpdate();
    }

    
</script>