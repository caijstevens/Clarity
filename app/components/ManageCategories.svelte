<frame>
    <page>
        <actionBar title="Manage Categories" class="action-bar" backgroundColor="#8B5943">
            <actionItem
            on:tap="{closeModal}" ios.systemIcon="14" ios.position="right" android.systemIcon="ic_menu_close_clear_cancel" android.position="actionBar"/> 
        </actionBar>
        <absoluteLayout height="80">
            <label text=""/>
        </absoluteLayout>

    </page>
</frame>

<script lang="ts">
    import { closeModal } from "svelte-native";
    
    import { Category } from "./classes/Category";

    let categories: Category[] = [];

</script>