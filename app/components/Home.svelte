<!-- This is the main page which opens when the user opens the app. It displays the user's schedule for the day. -->

<page on:navigatingTo="{onNavigatingTo}">
    <actionBar title="CLARITY" class="action-bar" backgroundColor="#8B5943">
        <!-- Adds a button to create a new schedule. This takes the user to the AddSchedule page. -->
        <actionItem
            on:tap="{addSchedulePage}"
            ios.systemIcon="4" ios.position="right"
            android.systemIcon="btn_plus" android.position="actionBar"
        /> 
    </actionBar>

    <!-- Making use of a dockLayout to position elements in the correct places. -->
    <dockLayout class="home" stretchLastChild="true" backgroundColor="#E3E1E6">
        <absoluteLayout dock="top" height="40" backgroundColor="#E1D1B9">
            <label text="Today" height="40" width="100%" textAlignment="center" color="white" fontSize="20"/>
            <button class="profileButton" on:tap="{toProfile}" left="330" text="P" top="-2" width="30" height="30"/>
        </absoluteLayout>
        <!-- Creates a bar to switch the viewed date on the calendar. -->  
        <stackLayout dock="top" orientation="horizontal" height="60" backgroundColor="#D9Bf9D" on:swipe="{ onWeekSwipe }">
            {#each weekDates as date, index (index)}
                <absoluteLayout width="{100/7}%">
                    <label text="{ weekDays[index] }" color="white" left="25" top="5" textAlignment="center"/>
                    {#if selectedDay.getTime() == utils.getDay(date).getTime()}
                        <button class="dateButton" text="{ date.getDate().toString() }" backgroundColor="#8B5943" color="white" left="-2" top="15" textAlignment="center" height="30" width="30"/>
                    {:else}
                        <button class="dateButton" text="{ date.getDate().toString() }" on:tap="{() => changeSelectedDay(date) }" backgroundColor="#5B484A" color="white" left="-2" top="15" textAlignment="center" height="30" width="30"/>
                    {/if}
                </absoluteLayout>
            {/each}
        </stackLayout>


        <label dock="bottom" height="1" backgroundColor="#E3E1E6"/>  
        <!-- Creates a scrollView for the calendar itself. -->
        <scrollView orientation="vertical">
            <!-- Uses a 'for' loop to display the hourly time. -->
            <absoluteLayout backgroundColor="#E3E1E6">
                {#each Array(24) as _, index (index)}
                    <label text="{padNumber(index,2)}:00" class="timeLabel" top="{40 * index}" width="100%" height="20" textAlignment="left" paddingLeft="10" color="#5B484A"/>
                    <label text=" " top="{(40 * index) + 20} " width="100%" height="20" textAlignment="left" paddingLeft="10" color="#5B484A"/>
                {/each}
                {#each tasks as task, index(index)}
                    {#if utils.getDay(task.startTime).getTime() == selectedDay.getTime()}
                        <button class="task" top="{(40 * utils.toHours(task.displayedStart)) - 8}" width="75%" left="40%" height="{40 * task.displayedLength}" textAlignment="left" paddingLeft="5" backgroundColor="{categories[task.category].colour}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}" on:longPress="{() => openTask(index) }"/>
                        {#if task.displayedLength > 0.75}
                            <label top="{(40 * utils.toHours(task.displayedStart)) - 8}" width="75%" left="40%" height="40" textAlignment="left" paddingLeft="20" paddingTop="7" textWrap="true" on:longPress="{() => openTask(index) }">
                                <formattedString>
                                    <span text="{task.name}" fontSize="11" fontWeight="bold"/>
                                    <span text="\n"/>
                                    {#if task.dynamic}
                                        {#if task.timeframe < 1}
                                            <span text="{utils.toDate(task.timeframe).getMinutes() + " mins"}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}" on:longPress="{() => openTask(index) }"/>
                                        {:else}
                                            <span text="{utils.toDate(task.timeframe).getHours() + " hrs " + utils.toDate(task.displayedLength).getMinutes() + " mins"}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}" on:longPress="{() => openTask(index) }"/>
                                        {/if}
                                    <!-- If the task is not dynamic, it displays its start time and end time. -->
                                    {:else}
                                        <span text="{task.startTime.toLocaleTimeString("en-GB").slice(0,5) + " - " + task.endTime.toLocaleTimeString("en-GB").slice(0,5)}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}" on:longPress="{() => openTask(index) }"/>
                                    {/if}
                                </formattedString>
                            </label>
                        {:else}
                            <label top="{(40 * utils.toHours(task.displayedStart)) - 8}" width="75%" left="40%" height="{40 * task.timeframe}" textAlignment="left" paddingLeft="20" paddingTop="10" textWrap="true">
                                <formattedString>
                                    <span text="{task.name}" fontSize="11" fontWeight="bold"/>
                                    <span text="          "/>
                                    {#if task.dynamic}
                                        {#if task.timeframe < 1}
                                            <span text="{utils.toDate(task.timeframe).getMinutes() + " mins"}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}" on:longPress="{() => openTask(index)}"/>
                                        {:else}
                                            <span text="{utils.toDate(task.timeframe).getHours() + " hrs " + utils.toDate(task.displayedLength).getMinutes() + " mins"}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}" on:longPress="{() => openTask(index)}"/>
                                        {/if}
                                    <!-- If the task is not dynamic, it displays its start time and end time. -->
                                    {:else}
                                        <span text="{task.startTime.toLocaleTimeString("en-GB").slice(0,5) + " - " + task.endTime.toLocaleTimeString("en-GB").slice(0,5)}" color="{utils.getTextColourFromBackground(categories[task.category].colour)}" on:longPress="{() => openTask(index)}"/>
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
    import { navigate } from 'svelte-native';
    import { showModal } from 'svelte-native';
    import { Http } from '@nativescript/core';
    import { SwipeGestureEventData } from "@nativescript/core";

    import AddSchedule from "./AddSchedule.svelte";
    import modifyTask from "./modifyTask.svelte";
    import loginPage from "./loginPage.svelte";
    import RegisterPage from "./registerPage.svelte";
    import Profile from "./Profile.svelte";
    import * as utils from "./utils";

    import { Task } from "./classes/Task";
    import { Category } from "./classes/Category";
    import { UserSettings } from "./classes/UserSettings";
    import { ServerInfo } from "./classes/ServerInfo";
    import { buildSchedule } from "./ScheduleDesignation";
    

    // Creates blank arrays for a list of tasks and a list of categories.
    let tasks: Task[] = [];
    tasks = updateSchedule(tasks);
    let categories: Category[] = [new Category(), new Category()];
    let selectedDay = utils.getDay();
    let weekDays = ["M","T","W","T","F","S","S"];
    let weekDates = utils.getWeekFromDay(selectedDay);
    let isModalOpen: boolean = false;
    export let thisUser = new UserSettings("username", "password", "email address", "nickname", "000000", new Date(8 * 3600000), new Date(20 * 3600000));
    export let username: string;
    
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

    function updateSchedule(tasks: Task[]) {
        return buildSchedule(tasks);
    }

    function toProfile() {
        navigate ({
            page: Profile,
            props: {
                userSettings: thisUser 
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

    async function openTask(index: number) {
        if (!isModalOpen) {
            isModalOpen = true;
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
            isModalOpen = false;
        }
    }

    async function checkLogin() {
        const result: string | undefined = await showModal({
            page: loginPage
        })
        console.log(result?.slice(0,9));
        if (!result) {
            checkLogin();       
        } else if (result == "registerPage") {
            checkRegister();
        } else if (result.slice(0, 10) == "logged in-") {
            username = result.slice(10);
            console.log(username);
        }
    }

    async function checkRegister() {
        const result: string | undefined = await showModal({
            page: RegisterPage
        })
        if (!result) {
            checkRegister();
        } else if (result == "loginPage") {
            checkLogin();
        } else if (result.slice(0, 9) == "logged in-") {
            username = result.slice(10);
        }
    }

    function onNavigatingTo() {
        console.log("username: " + username);
        if (!username) {
            checkLogin();    
        }
        thisUser.tasks = tasks;
        updateSchedule(tasks);
        copyTasksToDatabase(username, tasks);
        updateTaskTimes();
    }

    function copyTasksToDatabase(username: string, tasks: Task[]) {
        thisUser.tasks = tasks;
        Http.request({
            url: "http://172.20.10.2:5434",
            method: "POST",
            content: JSON.stringify({
                action: "updateTasks",
                username: username,
                tasks: tasks
            })
        }).then(
            (response) => {
            })
             
    }

    //main
    

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

    .profileButton {
        border-radius: 15;
    }
</style>
