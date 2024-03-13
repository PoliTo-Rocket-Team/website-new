<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { ActionData, PageData } from "./$types";
    import { goto } from "$app/navigation";
    import "@fontsource/plus-jakarta-sans/400-italic.css";

    export let form: ActionData;
    export let data: PageData;

    let submitting = false;
    let show_psw = false;

    const re = /^[^@]+(@politorocketteam\.it)?$/;

    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        if (submitting) return;
        submitting = true;
        const username = formData.get("username");
        const password = formData.get("password");
        if (typeof username === "string" && typeof password === "string") {
            const r = re.exec(username);
            if (!r) return void (form = { username, success: false });
            const email = r[1] ? username : username + "@politorocketteam.it";
            const res = await data.supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (res.error) form = { username, success: false };
            else await goto(data.goto);
        } else form = { username: "", success: false };
        submitting = false;
    };

    function removeError() {
        if (form) form.success = true;
    }
</script>

<svelte:head>
    <title>Login into the PRT admin program</title>
</svelte:head>

<main>
    <h1>Login</h1>
    <form method="post" use:enhance={submit}>
        <input
            type="text"
            name="username"
            autocomplete="username"
            placeholder="Username"
            value={form ? form.username : ""}
            on:input={removeError}
        />
        <div class="with-toggle">
            <label>
                <input type="checkbox" bind:checked={show_psw} />
                <svg
                    height="200"
                    viewBox="0 0 200 200"
                    width="200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="var(--fg-1)"
                        d="M177.5,67.4a9.75,9.75,0,0,0-14-1.5c-10.5,8.5-20,14.5-29.5,17.5-9.5,3.5-20.5,5-34,5s-24.5-1.5-34-5-19-9-29.5-17.5c-4.5-3.5-10.5-3-14,1.5s-3,10.5,1.5,14A132.06,132.06,0,0,0,45,95.9l-8.5,14.5c-2.5,5-1,11,3.5,13.5,5,2.5,11,1,13.5-3.5L63,103.9a112.84,112.84,0,0,0,27,4.5v18a10,10,0,0,0,20,0v-18a106.6,106.6,0,0,0,29-5.5l10,17.5a9.86,9.86,0,0,0,17-10l-9-15.5a111.22,111.22,0,0,0,19-13.5C180.5,77.9,181,71.9,177.5,67.4Z"
                    />
                </svg>
                <svg
                    version="1.1"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        fill="var(--fg-0)"
                        d="M12,4C7.3,4,3.2,6.9,1.2,11.1c-0.3,0.6-0.3,1.3,0,1.9C3.2,17.1,7.3,20,12,20s8.8-2.9,10.8-7.1   c0.3-0.6,0.3-1.3,0-1.9C20.8,6.9,16.7,4,12,4z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z"
                    />
                </svg>
            </label>
            <input
                type={show_psw ? "text" : "password"}
                name="password"
                autocomplete="current-password"
                placeholder="Password"
                on:input={removeError}
            />
        </div>
        <input type="hidden" name="redirect" value={data.goto} />
        <button type="submit" disabled={submitting}>Login</button>
    </form>
    {#if form && !form.success}
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
    input,
    button {
        margin: 0.6rem;
    }
    input[type="text"],
    input[type="password"] {
        color: inherit;
        background-color: var(--bg-1);
        padding: 0.4rem 0.8rem;
        border-radius: 0.25rem;
        border: none;
        font-family: inherit;
        font-size: 1.2rem;
        width: 22ch;
        z-index: 1;
    }
    input:focus-visible {
        outline: none;
    }
    input:read-only {
        color: var(--fg-1);
    }
    input:autofill {
        background-color: var(--bg-1) !important;
        background-image: none;
        font-style: italic;
    }
    .with-toggle {
        position: relative;
    }
    label {
        position: absolute;
        right: 0.8rem;
        top: 50%;
        z-index: 10;
        transform: translateY(-50%);
        display: block;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        cursor: pointer;
        padding: 0.1rem;
    }
    label:hover {
        background-color: #aaa3;
    }
    input[type="checkbox"] {
        transform: scale(0);
        opacity: 0;
        position: absolute;
    }
    input:checked + svg {
        display: none;
    }
    input:not(:checked) + svg + svg {
        display: none;
    }

    svg {
        display: block;
        height: 100%;
        width: 100%;
    }

    button {
        color: var(--accent-text);
        border: 2px solid var(--accent-fig);
        padding: 0.4rem 1rem;
        transition:
            background-color 0.2s ease,
            color 0.2s ease;
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
