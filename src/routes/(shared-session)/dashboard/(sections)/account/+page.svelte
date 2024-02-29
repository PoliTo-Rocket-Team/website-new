<script lang="ts">
    import type { ActionData, PageData } from "./$types";
    import {
        getEmailOf,
        fiximg,
        type PictureStore,
    } from "$lib/dashboard-utils";
    import Loading from "$lib/Loading.svelte";
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { getContext } from "svelte";

    export let form: ActionData;
    export let data: PageData;

    const picture: PictureStore = getContext("picture");
    let considering: string | null = null;

    const email = getEmailOf(data.person.first_name, data.person.last_name);
    let modifying = !!form?.linkedin;
    let imgState = 0;

    function imgError(msg: string) {
        form = { success: false, picture: msg };
    }
    const getSizeFromImgURL = (url: string) =>
        new Promise<{ width: number; height: number }>(resolve => {
            const img = new Image();
            img.onload = () =>
                resolve({
                    height: img.height,
                    width: img.width,
                });
            img.src = url;
        });
    async function onfile(this: HTMLInputElement) {
        const f = this.files ? this.files.item(0) : null;
        if (!f) return imgError("No file was selected");
        if (f.type !== "image/jpeg")
            return imgError(`The file type must be a jpeg (got ${f.type})`);
        if (f.size > 512000)
            return imgError(
                `Size of ${(f.size * 1e-3).toFixed(
                    0
                )}KB exceeds the maximum of 500KB`
            );
        imgState = 1;
        if (form?.picture) form = null;
        const url = URL.createObjectURL(f);
        const size = await getSizeFromImgURL(url);
        if (size.width === size.height) {
            imgState = 2;
            considering = url;
        } else {
            imgState = 0;
            imgError(
                `The selected picture is not square (${size.width}\u00D7${size.height} pixels)`
            );
        }
    }
    function onreset(this: HTMLFormElement) {
        imgState = 0;
        considering = null;
    }
    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        if (imgState !== 2) return;
        const f = formData.get("picture");
        if (!(f instanceof File)) return;
        imgState = 1;
        const res = await data.supabase.storage
            .from("people-pics")
            .upload(`${data.person.id}-${data.person.last_name}.jpeg`, f, {
                upsert: true,
            });
        imgState = 0;
        if (res.error) {
            console.log(res.error);
            imgError(res.error.message);
            considering = null;
        } else {
            picture.refresh();
        }
    };

    const url_regexp =
        /^(?:https:\/\/)?(?:www\.)?linkedin\.(?:it|com)\/in\/([\w-]+)\/?(?:\?.*)?$/;
    const username_regexp = /^[\w-]+$/;
    let linkedin = data.person.linkedin;

    function checkLinkdinId(this: HTMLInputElement) {
        const match = url_regexp.exec(this.value);
        linkedin = match
            ? match[1]
            : username_regexp.test(this.value)
              ? this.value
              : null;
    }
</script>

<svelte:head>
    <title>Your Account | PRT Admin Program</title>
</svelte:head>

<h1>Your account</h1>

<h2>Picture</h2>
<p>
    This is the picture used in the website to represent you: please make sure
    your face is clearly visible even in small sizes. Moreover, the file must be
    a <b>jpeg</b> with size <b>less than 500KB</b> and the picture must be square.
    The first size is for the future alumni page, the second is the size of lead
    pictures in the current team page, while the last is simply extra small.
</p>

<div class="imgs">
    <img
        src={considering || $picture}
        alt="Hopefully your face"
        data-seed={data.person.first_name}
        style:--size="12rem"
        on:error={fiximg}
    />
    <img
        src={considering || $picture}
        alt="Hopefully your face"
        data-seed={data.person.first_name}
        style:--size="7.2rem"
        on:error={fiximg}
    />
    <img
        src={considering || $picture}
        alt="Hopefully your face"
        data-seed={data.person.first_name}
        style:--size="4rem"
        on:error={fiximg}
    />
</div>

<form action="?/pic" method="post" on:reset={onreset} use:enhance={submit}>
    <label class="btn" class:hidden={imgState !== 0}>
        <input type="hidden" name="person-id" value={data.person.id} />
        <input
            type="hidden"
            name="person-last-name"
            value={data.person.last_name}
        />

        <input
            type="file"
            name="picture"
            accept="image/jpeg"
            on:input={onfile}
        />
        Upload new picture
    </label>
    {#if imgState === 1}
        <Loading>
            <span class="btn">Loading...</span>
        </Loading>
    {/if}
    <div class="btns" class:hidden={imgState !== 2}>
        <button class="btn" type="submit">Confirm</button>
        <button class="btn btn--low" type="reset">Cancel</button>
    </div>
</form>
{#if form?.picture}
    <p class="error">{form.picture}</p>
{/if}

<h2>Contacts</h2>
<ul class="no-list">
    <li>
        <span>Official email:</span>
        <a href="mailto:{email}" target="_blank" rel="noreferrer">{email}</a>
    </li>
    <li>
        <div class="linkedin-display">
            <span>LinkedIn profile:</span>
            {#if linkedin}
                <a
                    class=""
                    href="https://www.linkedin.com/in/{linkedin}"
                    target="_blank"
                    rel="noreferrer">linkedin.com/in/{linkedin}</a
                >
            {:else}
                <span class="low">not set</span>
            {/if}

            <button
                class="btn"
                class:hidden={modifying}
                type="button"
                on:click={() => {
                    modifying = true;
                    linkedin = null;
                }}>Edit</button
            >
        </div>

        {#if modifying}
            <form
                action="?/linkedin"
                method="post"
                class="linkedin-form"
                use:enhance={async ({ cancel }) => {
                    cancel();
                    const res = await data.supabase
                        .from("people")
                        .update({ linkedin })
                        .eq("id", data.person.id);
                    if (res.error)
                        form = { success: false, linkedin: res.error.message };
                    else {
                        data.person.linkedin = linkedin;
                        modifying = false;
                    }
                }}
            >
                <p>
                    Please insert your LinkedIn username or a link to your
                    LinkedIn profile
                </p>
                <input
                    type="text"
                    name="username"
                    autocomplete="off"
                    class="inline"
                    placeholder="URL or username"
                    value=""
                    on:input={checkLinkdinId}
                    data-ref={data.person.linkedin}
                />

                <input type="hidden" name="person-id" value={data.person.id} />

                <div class="linkedin-form-btn">
                    <button class="btn" type="submit">Save</button>
                    <button
                        class="btn btn--low"
                        type="reset"
                        on:click={() => {
                            modifying = false;
                            linkedin = data.person.linkedin;
                        }}>Cancel</button
                    >
                </div>

                {#if form?.linkedin}
                    <p class="error">{form.linkedin}</p>
                {/if}
            </form>
        {/if}
    </li>
</ul>

<style>
    p {
        margin-bottom: 1rem;
    }
    .imgs {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }
    .imgs img {
        display: block;
        width: var(--size);
        height: var(--size);
        margin-right: 2ch;
    }
    img {
        border-radius: 50%;
    }
    img:first-child {
        border-radius: 0.4rem;
    }
    .btns {
        display: flex;
    }
    .btns button {
        margin-right: 1rem;
    }
    form {
        --loading-width: 13.5ch;
    }
    .error {
        margin-top: 1rem;
    }
    a {
        text-decoration-style: dashed;
    }
    /* .oneliner.unchanged button {
        display: none;
    } */
    ul.no-list {
        list-style: none;
    }
    li {
        padding: 0.5rem 0;
    }

    label > input {
        display: none;
    }

    .hidden {
        display: none;
    }

    .linkedin-display {
        position: relative;
        width: fit-content;
    }
    .linkedin-display button {
        position: absolute;
        right: -1rem;
        top: 50%;
        transform: translate(100%, -50%);
    }

    .linkedin-form {
        margin-top: 1rem;
        border: 2px solid #8882;
        border-radius: 0.6rem;
        display: flex;
        align-items: flex-start;
        width: 35ch;
        flex-direction: column;
        padding: 0.8rem 1.1rem;
    }
    .linkedin-form input {
        width: 100%;
        padding: 0.5rem 0.8rem;
        border: 2px solid var(--accent-fig);
        margin-bottom: 1rem;
    }
    .linkedin-form-btn {
        display: flex;
        justify-content: center;
        gap: 1rem;
        width: 100%;
    }
</style>
