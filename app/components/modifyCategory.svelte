<frame>
    <page backgroundColor="#5B484A">
        <actionBar title="Edit Task" class="action-bar" backgroundColor="#8B5943">
            <actionItem on:tap="{closeModal}" ios.systemIcon="14" ios.position="right" android.systemIcon="ic_menu_close_clear_cancel" android.position="actionBar"/> 
        </actionBar>

        <!-- Stack layout allows all the properties of the task to be presented in a vertical list. -->
        <stackLayout orientation="vertical">
            <!-- An editable text field which gives the user the option to change the name of the current task. -->
                       
            <absoluteLayout height="50">
                <textField bind:text="{currentCategory.name}" hint="Name" editable="true" fontSize="20" height="40" /> 
                <label text="Colour" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                <!--<button text="Choose New Colour" on:tap="{() => openPalette()}" fontSize="20" color="white" textAlignment="left" paddingLeft="15" backgroundColor="#5B484A"/>-->
            </absoluteLayout>
            <absoluteLayout height="50">
                <label text="Priority" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                <listPicker items="{ priorityList }" on:selectedIndexChange="{ priorityInput }" width="60%" height="100%" left="155" selectedIndex="{ currentCategory.priority }"/>
            </absoluteLayout>
            <absoluteLayout height="50">
                <label text="Enjoyment" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                <listPicker items="{ enjoymentList }" on:selectedIndexChange="{ enjoymentInput }" width="60%" height="100%" left="155" selectedIndex="{ currentCategory.enjoyment }"/>
            </absoluteLayout>
            <absoluteLayout height="50">
                <button text="Delete" on:tap="{ () => closeModal("delete") }" fontSize="20" color="red" textAlignment="left" paddingLeft="0" backgroundColor="#5B484A"/>
            </absoluteLayout>
        </stackLayout>
    </page>
</frame>

<script lang="ts">
    // Imports for the necessary classes and functions.
    import CategoryColourPicker from "./CategoryColourPicker.svelte";
    import { showModal } from 'svelte-native';
    import { closeModal } from "svelte-native";
    import { navigate } from "svelte-native";
    import { PropertyChangeData } from "@nativescript/core";
    import { Category } from "./classes/Category";
    
    // Declaring useful variables for use in functions.
    let currentCategory: Category;
    let priorityList = ["Low", "Medium", "High"];
    let enjoymentList = ["Low", "Medium", "High"];
    import * as utils from "./utils";

    /*async function openPalette() {
        const result = await showModal({
            page: CategoryColourPicker
        })       
        
    }*/
   
    function forceUpdate() {
        currentCategory = currentCategory;
    }

    function priorityInput(data: PropertyChangeData) {
        currentCategory.onPriorityChanged(data.value);
        forceUpdate();
    }

    function enjoymentInput (data: PropertyChangeData) {
        currentCategory.onEnjoymentChanged(data.value);
        forceUpdate();
    }

</script>