<!-- This is the main page which opens when the user opens the app. It displays the user's schedule for the day. -->
<page on:navigatingTo="{updateTaskTimes}">
    <actionBar title="CLARITY" class="action-bar">
        <!-- Adds a button to create a new schedule. This takes the user to the AddSchedule page. -->
        <actionItem
            on:tap="{addSchedulePage}"
            ios.systemIcon="4" ios.position="right"
            android.systemIcon="btn_plus" android.position="actionBar"
        /> 
    </actionBar>
    <!-- Making use of a dockLayout to position elements in the correct places. -->
    <dockLayout class="home" stretchLastChild="true" backgroundColor="#FFFFFF">
        <label text="date, settings + profile" dock="top" height="40" backgroundColor="deeppink" textAlignment="center"/> 
        <!-- Creates a bar to switch the viewed date on the calendar. -->  
        <stackLayout dock="top" orientation="horizontal" height="60" backgroundColor="#3478FF" on:swipe="{ onWeekSwipe }">
            {#each weekDates as date, index (index)}
                <absoluteLayout width="{100/7}%">
                    <label text="{ weekDays[index] }" color="white" left="25" top="5" textAlignment="center"/>
                    {#if selectedDay.getTime() == utils.getDay(date).getTime()}
                        <button class="dateButton" text="{ date.getDate().toString() }" backgroundColor="red" color="white" left="-2" top="15" textAlignment="center" height="30" width="30"/>
                    {:else}
                        <button class="dateButton" text="{ date.getDate().toString() }" on:tap="{() => changeSelectedDay(date) }" backgroundColor="black" color="white" left="-2" top="15" textAlignment="center" height="30" width="30"/>
                    {/if}
                </absoluteLayout>
            {/each}
        </stackLayout>



        <label dock="bottom" height="1" backgroundColor="darksalmon"/>  
        <!-- Creates a scrollView for the calendar itself. -->
        <scrollView orientation="vertical">
            <!-- Uses a 'for' loop to display the hourly time. -->
            <absoluteLayout backgroundColor="#3c495e">
                {#each Array(24) as _, index (index)}
                    <label text="{padNumber(index,2)}:00" class="timeLabel" top="{40 * index}" width="100%" height="20" textAlignment="left" paddingLeft="10"/>
                {/each}
                {#each tasks as task, index(index)}
                    {#if utils.getDay(task.startTime).getTime() == selectedDay.getTime()}
                        <button class="task" top="{(40 * utils.toHours(task.displayedStart)) - 8}" width="75%" left="40%" height="{40 * task.displayedLength}" textAlignment="left" paddingLeft="5" backgroundColor="{categories[task.category].colour}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}"/>
                        {#if task.displayedLength > 0.75}
                            <label top="{(40 * utils.toHours(task.displayedStart)) - 8}" width="75%" left="40%" height="40" textAlignment="left" paddingLeft="20" paddingTop="7" textWrap="true">
                                <formattedString>
                                    <span text="{task.name}" fontSize="11" fontWeight="bold"/>
                                    <span text="\n"/>
                                    {#if task.dynamic}
                                        {#if task.timeframe < 1}
                                            <span text="{utils.toDate(task.timeframe).getMinutes() + " mins"}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}"/>
                                        {:else}
                                            <span text="{utils.toDate(task.timeframe).getHours() + " hrs " + utils.toDate(task.timeframe).getMinutes() + " mins"}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}"/>
                                        {/if}
                                    <!-- If the task is not dynamic, it displays its start time and end time. -->
                                    {:else}
                                        <span text="{task.startTime.toLocaleTimeString("en-GB").slice(0,5) + " - " + task.endTime.toLocaleTimeString("en-GB").slice(0,5)}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}"/>
                                    {/if}
                                </formattedString>
                            </label>
                        {:else}
                            <label top="{(40 * utils.toHours(task.displayedStart)) - 8}" width="75%" left="40%" height="20" textAlignment="left" paddingLeft="20" paddingTop="10" textWrap="true">
                                <formattedString>
                                    <span text="{task.name}" fontSize="11" fontWeight="bold"/>
                                    <span text="          "/>
                                    {#if task.dynamic}
                                        {#if task.timeframe < 1}
                                            <span text="{utils.toDate(task.timeframe).getMinutes() + " mins"}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}"/>
                                        {:else}
                                            <span text="{utils.toDate(task.timeframe).getHours() + " hrs " + utils.toDate(task.timeframe).getMinutes() + " mins"}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}"/>
                                        {/if}
                                    <!-- If the task is not dynamic, it displays its start time and end time. -->
                                    {:else}
                                        <span text="{task.startTime.toLocaleTimeString("en-GB").slice(0,5) + " - " + task.endTime.toLocaleTimeString("en-GB").slice(0,5)}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}"/>
                                    {/if}
                                </formattedString>
                            </label>
                        {/if}
                    {/if}
                {/each}
            </absoluteLayout>
        </scrollView>   
    </dockLayout>
</page>

<script lang="ts">


    // Imports for the necessary classes and functions.
    import AddSchedule from "./AddSchedule.svelte";
    import { navigate } from 'svelte-native';
    import { Task } from "./classes/Task";
    import { Category } from "./classes/Category";
    import * as utils from "./utils";
    import { SwipeGestureEventData } from "@nativescript/core";

    // Creates blank arrays for a list of tasks and a list of categories.
    let tasks: Task[] = [];
    let categories: Category[] = [new Category(), new Category()];
    let selectedDay = utils.getDay();
    let weekDays = ["M","T","W","T","F","S","S"];
    let weekDates = utils.getWeekFromDay(selectedDay);
    
    // An aesthetics management function to ensure that the hours are displayed in 24-hour time, adding leading zeros where needed.
    function padNumber(num: number, size: number) {
        var hourString = String(num);
        while (hourString.length < (size || 2)) {hourString = "0" + hourString}
        return hourString;
    }

    // The function to navigate to the AddSchedule page when required.
    function addSchedulePage() {
        navigate ({
            page: AddSchedule,
            props: {
                tasks: tasks,
                categories: categories
            }
        })
    }

    function forceUpdate() { 
        tasks = tasks;
    }

    function updateTaskTimes() {
        for (let index = 0; index < tasks.length; index++) {
            let thisTask = tasks[index];
            thisTask.calculateDisplayTimes();
        }
        forceUpdate();

    }

    function changeSelectedDay(day: Date) {
        selectedDay = utils.getDay(day);
        weekDates = utils.getWeekFromDay(selectedDay);
    }

    function onWeekSwipe(data: SwipeGestureEventData) {
        if (data.direction == 1) {
            changeSelectedDay(new Date(selectedDay.getTime() - (86400000 * 7)));
        } else if (data.direction == 2) {
            changeSelectedDay(new Date(selectedDay.getTime() + (86400000 * 7)));
        }
    }

</script>

<style>
    .home {
        background-color: darkcyan;
    }
    .timeLabel {
        border-top-color: #8e8e8e;
        border-top-width: 1;
    }

    .task {
        border-color: #8e8e8e;
        border-width: 1;
        border-radius: 5;
    }

    .dateButton {
        border-radius: 15;
    }
</style>
