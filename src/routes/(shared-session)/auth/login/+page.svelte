<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { ActionData, PageData } from "./$types";
    import { goto } from "$app/navigation";

    export let form: ActionData;
    export let data: PageData;

    let submitting = false;

    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        if(submitting) return;
        submitting = true;
        const email = formData.get("email");
        const password = formData.get("password");
        if(typeof email === "string" && typeof password === "string") {
            const res = await data.supabase.auth.signInWithPassword({email,password});
            if(res.error) form = { email, password, success: false };
            else await goto(data.goto);
        }   
        else form = { email: '', password: '', success: false };
        submitting = false;
    }

    function removeError() { form = null; }
</script>

<svelte:head>
    <title>Login into the PRT admin program</title>
</svelte:head>

<main>
    <h1>Login</h1>
    <form method="post" use:enhance={submit}>
        <input type="email" name="email" autocomplete="Email" placeholder="Email" value={form?.email} on:input={removeError}>
        <input type="password" name="password" autocomplete="current-password" placeholder="Password" value={form?.password} on:input={removeError}>
        <input type="hidden" name="redirect" value={data.goto}>
        <button type="submit" disabled={submitting}>Login</button>
    </form>
    {#if form}
        <p>Invalid email or username</p>
    {/if}
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
    h1 {
        text-align: center;
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
    button {
        color: var(--accent-text);
        border: 2px solid var(--accent-fig);
        padding: .4rem 1rem;
        transition: background-color .2s ease, color .2s ease;
        margin-top: 2rem;
        font-weight: 600;
    }
    button:hover {
        background-color: var(--accent-fig);
        color: white;
    }
    button:focus-visible {
        text-decoration: underline dashed currentColor;
        outline: none;
    }
    button:disabled {
        border-color: #8883;
        color: #8883;
        background-color: transparent;
    }
    p {
        text-align: center;
        margin-top: 1rem;
    }
    :global([data-theme="light"]) p {
        color: #b60600;
    }
    :global([data-theme="dark"]) p {
        color: #ff5454;
    }
</style>