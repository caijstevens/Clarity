<page backgroundColor="#5B484A">
    <actionBar title="Manage Routine Preferences" class="action-bar" backgroundColor="#8B5943">
    </actionBar>
    <stackLayout>
        <absoluteLayout height="80">
            <label text="Average Schedule Start Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
            <timePicker time="{ thisUser.scheduleStart }" on:timeChange="{ scheduleStartInput }" width="90%" height="100%"/>
        </absoluteLayout>
        <absoluteLayout height="40">
            <label text="Average Schedule End Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" top="0" />
            <timePicker time="{ thisUser.scheduleEnd }" on:timeChange="{ scheduleEndInput }" width="90%" height="100%" top="0"/>
        </absoluteLayout>
        <absoluteLayout height="80">
            <label text="Breakfast Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" top="20" />
            <timePicker time="{ thisUser.breakfastTime }" on:timeChange="{ breakfastTimeInput }" width="90%" height="100%" top="20"/>
        </absoluteLayout>
        <absoluteLayout height="80">
            <label text="Lunch Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
            <timePicker time="{ thisUser.lunchTime }" on:timeChange="{ lunchTimeInput }" width="90%" height="100%" />
        </absoluteLayout>
        <absoluteLayout height="80">
            <label text="Dinner Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" top="-20"/>
            <timePicker time="{ thisUser.dinnerTime }" on:timeChange="{ dinnerTimeInput }" width="90%" height="100%" top="-20"/>
        </absoluteLayout>
        <absoluteLayout height="40">
            <label text="Focus Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15"/>
            <listPicker items="{ focusLengthList }" selectedIndex="{ thisUser.focusLength }" on:selectedIndexChange="{ focusLengthInput }" left="205" width="40%" height="100%"/>
        </absoluteLayout>
        <absoluteLayout height="40">
            <label text="Workout Length" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" color="white"/>
            <listPicker items="{ workoutLengthList }" on:selectedIndexChange="{ workoutLengthInput }" left="205" width="40%" height="100%" selectedIndex="{ thisUser.workoutLength }"/>
        </absoluteLayout>
    </stackLayout>
</page>


<script lang="ts">
    // Imports for the necessary classes and functions.
    import { closeModal } from "svelte-native";
    import { PropertyChangeData } from "@nativescript/core";

    import { UserSettings } from "./classes/UserSettings";
    
    let thisUser = new UserSettings;
    let focusLengthList: String[] = ["30 mins", "60 mins", "90 mins", "120 mins", "150 mins"];
    let workoutLengthList: String[] = ["30 mins", "60 mins", "90 mins", "120 mins", "150 mins"];

    function forceUpdate() {
        thisUser = thisUser;
    }

    function scheduleStartInput(data: PropertyChangeData) {
        thisUser.changeScheduleStart(data.value);
        forceUpdate();
    }

    function scheduleEndInput(data: PropertyChangeData) {
        thisUser.changeScheduleEnd(data.value);
        forceUpdate();
    }

    function focusLengthInput(data: PropertyChangeData) {
        thisUser.changeFocusLength(data.value);
        forceUpdate();
    }

    function workoutLengthInput(data: PropertyChangeData) {
        thisUser.changeWorkoutLength(data.value);
        forceUpdate();
    }

    function breakfastTimeInput(data: PropertyChangeData) {
        thisUser.onBreakfastTimeChanged(data.value);
        forceUpdate();
    }

    function lunchTimeInput(data: PropertyChangeData) {
        thisUser.onLunchTimeChanged(data.value);
        forceUpdate();
    }

    function dinnerTimeInput(data: PropertyChangeData) {
        thisUser.onDinnerTimeChanged(data.value);
        forceUpdate();
    }
    
</script>