<page on:navigatingTo="{ forceUpdate }" backgroundColor="#5B484A">
    <actionBar title="Manage Categories" class="action-bar" backgroundColor="#8B5943">
        <!-- A navigationButton allows the user to return to the Home page. -->
        <navigationButton text="Back" android.systemIcon="ic_menu_back" on:tap="{ goBack }"/>
        <!-- A plus-shaped button which allows the user to create a new task. -->
        <actionItem on:tap="{ addCategory }" ios.systemIcon="4" ios.position="right" android.systemIcon="btn_plus" android.position="actionBar"/> 
    </actionBar>
    <!-- Creates a scrollView so that the list of tasks can be scrolled through in case they do not all fit on one view. -->
    <scrollView orientation="vertical">
        <stackLayout>
            <!-- A 'for' loop to display each category correctly in the list. -->
            {#each categories as category, i (i)}
                <!-- A button which opens the corresponding task when clicked. -->
                <button on:tap="{() => openCategory(i)}" textWrap="{true}" textAlignment="left" height="40" class="string" backgroundColor="#5B484A">
                    <formattedString>
                        <span text="{category.name}" fontSize="20" fontWeight="bold"/>
                        <span text="\n"/>
                    </formattedString>
                </button>
            {/each}
        </stackLayout>
    </scrollView>
</page>

<script lang="ts">
    import modifyCategory from "./modifyCategory.svelte";

    import { closeModal } from "svelte-native";
    import { goBack } from 'svelte-native';
    import { Category } from "./classes/Category";
    import { showModal } from 'svelte-native';
    import { navigate } from 'svelte-native';
    import { UserSettings } from "./classes/UserSettings";

    let categories: Category[] = [];

    function forceUpdate() {
        categories = categories;
    }
    

    async function openCategory(index: number) {
        let result = await showModal({
            page: modifyCategory,
            props: {
                currentCategory: categories[index]
            }
        })
        if (result == "delete") {
            categories.splice(index);
        }
        forceUpdate();
    }

    // Function which creates a new task and then navigates to the modifyTask page of that new task.
    function addCategory() {
        let index = categories.push(new Category());
        forceUpdate();
        openCategory(index - 1);
    }  

</script>