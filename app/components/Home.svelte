<page>
    <actionBar title="Home" />
    <scrollView orientation="horizontal">
        <stackLayout orientation="horizontal">
            
            <label class="info">
                <formattedString>
                    <span class="fas" text="&#xf135;" />
                    <span text=" {message}" />
                </formattedString>
            </label>
            <label class="info">
                <formattedString>
                    <span class="fas" text="&#xf135;" />
                    <span text=" {message}" />
                </formattedString>
            </label>
            <label class="info">
                <formattedString>
                    <span class="fas" text="&#xf135;" />
                    <span text=" {message}" />
                </formattedString>
            </label>
            <label class="info">
                <formattedString>
                    <span class="fas" text="&#xf135;" />
                    <span text=" {message}" />
                </formattedString>
            </label>
            <label class="info">
                <formattedString>
                    <span class="fas" text="&#xf135;" />
                    <span text=" {message}" />
                </formattedString>
            </label>
        </stackLayout>
    </scrollView>
</page>

<script lang="ts">
    let message: string = "bingbingbingbing"
</script>

<style>
    .info .fas {
        color: #F12A45;
    }

    .info {
        color: #F3ED45;
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
        font-weight: 500;
    }
</style>
