<frame>
    <page backgroundColor="#5B484A">
        <stackLayout>
            <label text="Current Nickname: {thisUser.userNickname}" fontSize="20" height="40" color="white"/>
            <textField hint="New Nickname: " editable="true" fontSize="20" height="40" color="white"/>
        </stackLayout>
    </page>
</frame>

<script lang="ts">
    import { UserSettings } from "./classes/UserSettings";

    let thisUser = new UserSettings;
</script>