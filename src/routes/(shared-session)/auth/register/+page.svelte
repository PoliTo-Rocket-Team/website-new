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
        if(mask !== 0b1111) return;
        if(!data.session) return;
        const password = formData.get("password");
        if(typeof password !== "string") return void (form = { error: "Invalid password value type", password: '' });
        const res = await data.supabase.auth.updateUser({password});
        if(res.error) return void (form = { password, error: res.error.message });
        else goto("/admin"); 
    }
</script>

<svelte:head>
    <title>Set password | PRT admin program</title>
</svelte:head>

<main>
    <h1>Set your password</h1>
    <p>Please <b>do not close this tab</b>: the code embedded in this requesti is valid only once. Here you must set the password of your account &mdash; <a href="mailto:{data.email}">{data.email}</a> &mdash; in the PRT admin program</p>
    <form method="post" use:enhance={submit}>
        <input type="email" name="email" value={data.email} readonly>
        <input type="password" name="password" autocomplete="new-password" bind:value={psw}>
        <button type="submit" disabled={mask !== 0}>Confirm</button>
    </form>
    <p>You new password must:</p>
    <ul>
        {#each pswCriteria as c, i}
            <li class:wrong={mask & (1<<i)}>{c}</li>
        {/each}
    </ul>
</main>