<frame>
    <page backgroundColor="#5B484A">
        
        <actionBar title="Edit Task" class="action-bar" backgroundColor="#8B5943">
            <actionItem on:tap="{closeModal}" ios.systemIcon="14" ios.position="right" android.systemIcon="ic_menu_close_clear_cancel" android.position="actionBar"/> 
        </actionBar>

        <!-- Stack layout allows all the properties of the task to be presented in a vertical list. -->
        <stackLayout orientation="vertical">
            <!-- An editable text field which gives the user the option to change the name of the current task. -->
            <textField bind:text="{currentCategory.name}" hint="Name" editable="true" fontSize="20" height="40" />            
                
            <absoluteLayout height="50">
                <label text="Colour" fontSize="20" height="100%" width="100%" textAlignment="left" paddingLeft="15" />
                <ColorPicker on:checkedChange="{ colourInput }" selectedIndex="{ thisCategory.colour }" bind:hex/>
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
    import { closeModal } from "svelte-native";
    import { PropertyChangeData } from "@nativescript/core";
    import ColorPicker from 'svelte-awesome-color-picker';	

    import * as utils from "./utils";

    import { Task } from "./classes/Task";
    import { Category } from "./classes/Category";
    
    // Declaring useful variables for use in functions.
    export let currentCategory: Category;
    let priorityList = ["Low", "Medium", "High"];
    let enjoymentList = ["Low", "Medium", "High"];
    let hex;

    function colourInput(data: PropertyChangeData) {
        currentCategory.onColourChanged(data.value);
        forceUpdate();
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