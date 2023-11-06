<!-- This page is used to create a list of tasks which the user needs to complete. It automatically updates all information upon being navigated to. -->
<page on:navigatingTo="{ forceUpdate }" backgroundColor="#5B484A">
    <actionBar title="Add New Schedule" class="action-bar" backgroundColor="#8B5943">
        <!-- A navigationButton allows the user to return to the Home page. -->
        <navigationButton text="Back" android.systemIcon="ic_menu_back" on:tap="{ goBack }"/>
        <!-- A plus-shaped button which allows the user to create a new task. -->
        <actionItem on:tap="{addTask}" ios.systemIcon="4" ios.position="right" android.systemIcon="btn_plus" android.position="actionBar"/> 
    </actionBar>
    <!-- Creates a scrollView so that the list of tasks can be scrolled through in case they do not all fit on one view. -->
    <scrollView orientation="vertical">
        <stackLayout>
            <!-- A 'for' loop to display each task correctly in the list. -->
            {#each tasks as task, i (i)}
                <!-- A button which opens the corresponding task when clicked. -->
                <button on:tap="{() => openTask(i)}" textWrap="{true}" textAlignment="left" height="40" class="string" backgroundColor="#5B484A">
                    <formattedString>
                        <span text="{task.name}" fontSize="20" fontWeight="bold"/>
                        <span text="\n"/>
                        <!-- If the task is dynamic, it displays its timeframe (this caters also for events under 1 hour in length). -->
                        {#if task.dynamic}
                            {#if task.timeframe < 1}
                                <span text="{utils.toDate(task.timeframe).getMinutes() + " mins"}"/>
                            {:else}
                                <span text="{utils.toDate(task.timeframe).getHours() + " hrs " + utils.toDate(task.timeframe).getMinutes() + " mins"}"/>
                            {/if}
                        <!-- If the task is not dynamic, it displays its start time and end time. -->
                        {:else}
                            <span text="{task.startTime.toLocaleTimeString("en-GB").slice(0,5) + " - " + task.endTime.toLocaleTimeString("en-GB").slice(0,5)}" />
                        {/if}
                    </formattedString>
                </button>
            {/each}
        </stackLayout>
    </scrollView>
</page>

<script lang="ts">
    // Imports for the necessary classes and functions.
    import { goBack } from 'svelte-native';
    import { showModal } from 'svelte-native';

    import modifyTask from "./modifyTask.svelte";
    import * as utils from "./utils";
    
    import { Task } from "./classes/Task";
    import { Category } from "./classes/Category";
    
    // Creates blank arrays for a list of tasks and a list of categories.
    export let tasks: Task[] = [];
    export let categories: Category[] = []

    // Forces the app to update the information so that the properties are reactive immediately
    function forceUpdate() {
        tasks = tasks;
    }

    // Function which navigates to the modifyTask page of the corresponding task.
    async function openTask(index: number) {
        let result = await showModal({
            page: modifyTask,
            props: {
                currentTask: tasks[index],
                categories: categories
            }
        })
        if (result == "delete") {
            tasks.splice(index);

        }
        forceUpdate();
    }

    // Function which creates a new task and then navigates to the modifyTask page of that new task.
    function addTask() {
        let index = tasks.push(new Task());
        forceUpdate();
        openTask(index - 1);
    }  
</script>
<style>
    
</style>
<!-- this is a comment -->