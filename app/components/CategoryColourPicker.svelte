<frame>
    <page>
        <actionBar title="Choose Colour" class="action-bar" backgroundColor="#8B5943">
            <actionItem on:tap="{closeModal}" ios.systemIcon="14" ios.position="right" android.systemIcon="ic_menu_close_clear_cancel" android.position="actionBar"/> 
        </actionBar>
        <absoluteLayout top="30" height="30">
            <label class="currentColourDisplay" width="50" horizontalAlignment="center" text="{currentCategory.name}" color="{utils.getTextColourFromBackground(currentCategory.colour)}"/>
        </absoluteLayout>
        <absoluteLayout top="50" height="40" left="10">
            <gridLayout columns="20,20,20,20,20,20,20,20,20,20" rows="20,20,20,20,20">
                {#each columnNumbers as columnNumber, index (index)}
                    {#each rowNumbers as rowNumber, index1 (index1)}
                        <button class="colourButton" on:tap="{applyColour(backgroundColours[rowNumber][columnNumber])}" row="{rowNumber}" column="{columnNumber}" backgroundColor="{backgroundColours[rowNumber][columnNumber]}"/>
                    {/each}
                {/each}
            </gridLayout>
        </absoluteLayout>
    </page>

</frame>

<script lang="ts">
    import { Category } from "./classes/Category";
    import { closeModal } from "svelte-native";
    import * as utils from "./utils";

    let columnNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let rowNumbers = [0, 1, 2, 3, 4];
    let currentCategory = new Category;
    let backgroundColours = [
    ["#660000", "#990000", "#CC0000", "#FF1919", "#FF1D1D", "#FF8080", "#FF9999", "#FFB2B2", "#FFCCCC", "#FFE6E6"],
    ["#000000", "#290029", "#520052", "#7A007A", "#A300A3", "#E680E6", "#F0B2F0", "#F5CCF5", "#FAE6FA", "#FFFFFF"],
    ["#0A1433", "#142966", "#1F3D99", "#2E5CE6", "#5C85FF", "#85A3FF", "#ADC2FF", "#C2D1FF", "#D6E0FF", "#EBF0FF"],
    ["#051405", "#0F3D0F", "#1A661A", "#248F24", "#2EB82E", "#5CD65C", "#85E085", "#ADEBAD", "#D6F5D6", "#EBFAEB"],
    ["#666600", "#999900", "#B2B200", "#CCCC00", "#E6E600", "#FFFF33", "#FFFF66", "#FFFF99", "#FFFFCC", "#FFFFE6"]
    ];

    function forceUpdate() {
        currentCategory = currentCategory;
    }

    function applyColour(newColour: string) {
        currentCategory.onColourChanged(newColour);
        forceUpdate();
    }

</script>

<style>
    .colourButton {
        border-radius: 5;
        border-width: 1;
        border-color: #8e8e8e;
    }
    .currentColourDisplay {
        border-radius: 5;
        border-width: 1;
        border-color: #8e8e8e;
    }
</style>