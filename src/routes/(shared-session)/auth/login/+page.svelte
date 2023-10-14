<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { ActionData, PageData } from "./$types";
    import { goto } from "$app/navigation";

    export let form: ActionData;
    export let data: PageData;

    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        console.log("submitting");
        const email = formData.get("email");
        const password = formData.get("password");
        if(typeof email === "string" && typeof password === "string") {
            const res = await data.supabase.auth.signInWithPassword({email,password});
            if(res.error) form = { email, password, success: false };
            else setTimeout(()=>goto(data.goto),0);
        }   
        else form = { email: '', password: '', success: false };
    }
</script>

<svelte:head>
    <title>Login into the PRT admin program</title>
</svelte:head>

<main>
    <h1>Login</h1>
    <form method="post" use:enhance={submit}>
        <input type="email" name="email" autocomplete="email" placeholder="email">
        <input type="password" name="password" autocomplete="current-password" placeholder="Password">
        <input type="hidden" name="redirect" value={data.goto}>
        <button type="submit">Login</button>
    </form>
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
</style>