<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { ActionData, PageData } from "./$types";
    import { pswCriteria, getPswCriteriaMask } from "./psw-validation";
    import { goto } from "$app/navigation";

    export let form: ActionData;
    export let data: PageData;

    let psw = form ? form.password : '';
    $: mask = typeof psw === "string" ? getPswCriteriaMask(psw) : 0;

    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        if(mask) return;
        const password = formData.get("password");
        if(typeof password !== "string") return void (form = { error: "Invalid password value type", password: '' });
        const res = await data.supabase.auth.updateUser({password});
        if(res.error) return void (form = { password, error: res.error.message });
        goto("/dashboard"); 
    }
</script>

<svelte:head>
    <title>Set password | PRT admin program</title>
</svelte:head>

<main>
    <h1>Set your password</h1>
    <p>Please, <b>do not close this tab</b>: the code embedded in this request is valid only once. Here you must set the password for your new account in the PRT admin program.</p>
    <form method="post" use:enhance={submit}>
        <input type="email" name="email" value={data.email} readonly>
        <input type="password" name="password" autocomplete="new-password" placeholder="Password" bind:value={psw}>
        <button type="submit" disabled={mask !== 0}>Confirm</button>
    </form>
    <p>You new password must:</p>
    <ul>
        {#each pswCriteria as c, i}
            <li class:wrong={mask & (1<<i)}>{c}</li>
        {/each}
    </ul>
</main>

<style>
    main {
        max-width: 58ch;
        margin: auto;
    }
    @media (min-width: 50rem) {
        main {
            padding-left: 0;
            padding-right: 0;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
    }
    input, button {
        margin: .6rem;
    }
    input {
        color: inherit;
        background-color: var(--bg-1);
        padding: .4rem .8rem;
        border-radius: .25rem;
        border: none;
        font-family: inherit;
        font-size: 1.2rem;
    }
    input:focus-visible {
        outline: none;
    }
    input:read-only {
        color: var(--fg-1);
    }
    ul {
        padding-left: 2ch;
    }
    li::first-letter {
        text-transform: uppercase;
    }
    :global([data-theme="light"]) li.wrong {
        color: #b60600;
    }
    :global([data-theme="dark"]) li.wrong {
        color: #ff5454;
    }
</style>