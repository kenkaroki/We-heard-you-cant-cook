<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from "$app/paths";
    import "../styles/component_styles/navbar/navbar.css";
    import {isUserLoggedIn} from "../lib/utils/authchecks/authcheck";

    let isAuth = false;

    let home: string = `${base}/dashboard`;
    let account: string = `${base}/account`;
    let login: string = `${base}/login`;
    let signup: string = `${base}/signup`;

    onMount(() => {
        isAuth = isUserLoggedIn();
    });
</script>

<nav class="navbar">
    {#if isAuth}
        <a href={home}>Home 🧑‍🍳</a>
        <a href={account}>Account 🧙‍♂️</a>
    {:else}
        <a href={home}>Home</a>
        <a href={login}>Login</a>
        <a href={signup}>Sign Up</a>
    {/if}
</nav>