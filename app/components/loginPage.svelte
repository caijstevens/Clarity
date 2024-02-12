<frame>
    <page backgroundColor="#5B484A">
        <actionBar title="Sign In" class="action-bar" backgroundColor="#8B5943"/>
        <stackLayout orientation="vertical">
            <textField bind:text="{ username }" hint="Username" editable="true" fontSize="20" height="40" textAlignment="center"/>
            <textField bind:text="{ password }" hint="Password" editable="true" fontSize="20" height="40" textAlignment="center"/>
            <button class="signInButton" text="Sign In" on:tap="{() => processLogin(username, password) }" fontSize="20" color="white" textAlignment="center" backgroundColor="#8B5943"/>
            <button text="Register" on:tap="{ () => closeModal("registerPage")}" fontSize="20" color="white" textAlignment="center" backgroundColor="#5B484A"/>
            {#if failedLogin}
                <absoluteLayout height="40" top="100" width="100%">
                    <label text="Invalid login credentials." fontSize="15" color="white" height="20" width="100%" textAlignment="center" top="0"/>
                </absoluteLayout>
        
            {/if}
        </stackLayout>
    </page>
</frame>

<script lang="ts">
    import { closeModal } from "svelte-native";
    import { Http } from '@nativescript/core';
    import * as serverInfo from "./classes/ServerInfo";
    import thisUser from "/Home.svelte";
    import { UserSettings } from "./classes/UserSettings";

    let username = "";
    let password = "";
    let failedLogin = false;

    function processLogin(username: string, password: string) {
        Http.request({
            url: "http://172.20.10.2:5434",
            method: "POST",
            content: JSON.stringify({
                action: "login",
                username: username,
                password: password
            })
        }).then(
            (response) => {
                if (response.content) {
                    console.log("response=" + response.content.toString());
                    if (response.statusCode == 418) {
                        failedLogin = true;
                        

                    } else {
                       closeModal('logged in-' + response.content.toString()); 
                    }
                        
                }
            },
            (error) => {
                console.log(error);
            }
        ); 
        console.log("Failed login: " + failedLogin); 
    }



</script>

<style>
    .signInButton {
        
        border-radius: 10;
    }
</style>