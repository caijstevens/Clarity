<!-- Page to modify a task. User is redirected to this page when either creating a new task or clicking on an existing task to modify it. -->
<frame>
    <page on:navigatingTo="{ catStringArray }" backgroundColor="#5B484A">
        <actionBar title="Edit Task" class="action-bar" backgroundColor="#8B5943">
            <actionItem
            on:tap="{closeModal}"
            ios.systemIcon="14" ios.position="right"
            android.systemIcon="ic_menu_close_clear_cancel" android.position="actionBar"
            /> 
        </actionBar>

        <!-- Stack layout allows all the properties of the task to be presented in a vertical list. -->
        <stackLayout orientation="vertical">
            <!-- An editable text field which gives the user the option to change the name of the current task. -->
            <textField bind:text="{currentTask.name}" hint="Name" editable="true" fontSize="20" height="40" />

            <!-- Presents the user with the option to have the event be fixed in time or dynamic. -->
            <absoluteLayout height="50">
                <label text="Dynamic" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15"/>
                <switch checked="{currentTask.dynamic}" on:checkedChange="{ dynamicInput }" height="100%" left="300"/>    
            </absoluteLayout>

            <!-- If the task is dynamic, the user can adjust how long the task should take, and choose whether or not it has a deadline. -->
            {#if currentTask.dynamic}
                <absoluteLayout height="50">
                    <label text="Timeframe" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                    <timePicker time="{utils.toDate(currentTask.timeframe)}" on:timeChange="{(data) => currentTask.onTimeframeChanged(utils.toHours(data.value))}" maxHour="11" width="90%" height="100%" left="20"/>
                </absoluteLayout>
                <absoluteLayout height="50">
                    <label text="Deadline" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                    <switch checked="{currentTask.hasDeadline}" on:checkedChange="{ hasDeadlineInput }" height="100%" left="300"/>
                </absoluteLayout>
                <!-- If the task has a deadline, the user can then provide the exact date and time of the deadline. -->
                {#if currentTask.hasDeadline}
                    <absoluteLayout height="50">
                        <timePicker time="{currentTask.deadline}" on:timeChange="{ deadlineInput }" maxHour="11" width="90%" height="100%"/>
                        <datePicker date="{currentTask.deadline}" on:dateChange="{ deadlineInput }" width="50%" height="100%" minDate="{new Date()}"/>
                        
                    </absoluteLayout>
                {/if}
            {:else}
                <!-- If the task is not dynamic, the user provides the start and end time of the event to prevent overlap of events. -->
                <absoluteLayout height="50">
                    <label text="Start Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                    <timePicker time="{currentTask.startTime}" on:timeChange="{ startTimeInput }" width="90%" height="100%"/>
                    <datePicker date="{currentTask.startTime}" on:dateChange="{ startTimeInput }" width="50%" height="100%" left="50" minDate="{new Date()}"/>
                </absoluteLayout>
                <absoluteLayout height="50">
                    <label text="End Time" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                    <timePicker time="{currentTask.endTime}" on:timeChange="{ endTimeInput }" width="90%" height="100%"/>
                </absoluteLayout>
                <!-- There is also an option to implement a deadline here, as above. -->
                <absoluteLayout height="50">
                    <label text="Deadline" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                    <switch checked="{currentTask.hasDeadline}" on:checkedChange="{ hasDeadlineInput }" height="100%" left="300"/>
                </absoluteLayout>
                {#if currentTask.hasDeadline}
                    <absoluteLayout height="50">
                        <timePicker time="{currentTask.deadline}" on:timeChange="{ deadlineInput }" maxHour="11" width="90%" height="100%"/>
                        <datePicker date="{currentTask.deadline}" on:dateChange="{ deadlineInput }" width="50%" height="100%" left="50" minDate="{new Date()}"/>
                        
                    </absoluteLayout>
                {/if}
            {/if}
            <!-- Allows the user to change the category of events the current task is assigned to. -->
            <absoluteLayout height="50">
                <label text="Category" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                <listPicker items="{ categoryNames }" on:selectedIndexChange="{ categoryInput }" width="60%" height="100%" left="155" selectedIndex="{ currentTask.category }"/>
            </absoluteLayout>
            <absoluteLayout height="50">
                <label text="Priority" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                <listPicker items="{ priorityList }" on:selectedIndexChange="{ priorityInput }" width="60%" height="100%" left="155" selectedIndex="{ currentTask.priority }"/>
            </absoluteLayout>
            <absoluteLayout height="50">
                <label text="Enjoyment" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                <listPicker items="{ enjoymentList }" on:selectedIndexChange="{ enjoymentInput }" width="60%" height="100%" left="155" selectedIndex="{ currentTask.enjoyment }"/>
            </absoluteLayout>
            <absoluteLayout height="50">
                <button text="Delete" on:tap="{ () => closeModal("delete") }" fontSize="20" color="red" textAlignment="left" paddingLeft="0" backgroundColor="#5B484A"/>
            </absoluteLayout>
            <absoluteLayout>
                <label text="Completed" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                <input type="checkbox"/>
            </absoluteLayout>
        </stackLayout>
    </page>
</frame>

<script lang="ts">
    // Imports for the necessary classes and functions.
    import { PropertyChangeData } from "@nativescript/core";
    import { Task } from "./classes/Task";
    import { Category } from "./classes/Category";
    import * as utils from "./utils";
    import { closeModal } from "svelte-native";

    // Declaring useful variables for use in many functions.
    export let currentTask: Task;
    export let categories: Category[];
    let categoryNames: string[];
    let priorityList = ["High", "Medium", "Low"];
    let enjoymentList = ["High", "Medium", "Low"];
    
    // Forces the app to update the information so that the properties are reactive immediately. All functions below with 'Input' in the name make use of forceUpdate on different features.
    function forceUpdate() {
        currentTask = currentTask;
    }

    function hasDeadlineInput(data: PropertyChangeData) {
        currentTask.onHasDeadlineChanged(data.value);
        forceUpdate()
    }

    function deadlineInput(data: PropertyChangeData) {
        currentTask.onDeadlineChanged(data.value);
        forceUpdate()
    }

    function dynamicInput(data: PropertyChangeData) {
        currentTask.onDynamicChanged(data.value);
        forceUpdate();
    }

    function startTimeInput(data: PropertyChangeData) {
        currentTask.onStartTimeChanged(data.value);
        forceUpdate();
    }

    function endTimeInput(data: PropertyChangeData) {
        currentTask.onEndTimeChanged(data.value);
        forceUpdate();
    }

    // This function here creates a list of the names of each category, so that they can then be used in the listPicker for the user to select a category.
    function catStringArray() {
        categoryNames = [];
        for (let index = 0; index < categories.length; index++) {
            categoryNames.push(categories[index].name);
        }   
        categoryNames = categoryNames;
    }

    function categoryInput(data: PropertyChangeData) {
        currentTask.onCategoryChanged(data.value);
        forceUpdate();
    }

    function priorityInput(data: PropertyChangeData) {
        currentTask.onPriorityChanged(data.value);
        forceUpdate();
    }

    function enjoymentInput (data: PropertyChangeData) {
        currentTask.onEnjoymentChanged(data.value);
        forceUpdate();
    }



</script>