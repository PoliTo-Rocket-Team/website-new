<script lang="ts">
    import type { ActionData, PageData } from "./$types";
    import { getEmailOf, fiximg, type PictureStore } from "$lib/dashboard-utils";
    import Loading from "$lib/Loading.svelte";
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { getContext } from "svelte";

    export let form: ActionData;
    export let data: PageData;

    const picture: PictureStore = getContext("picture");
    let considering: string|null = null;

    const email = getEmailOf(data.person.first_name, data.person.last_name);

    // function showButtons(this: HTMLInputElement) {
    //     const ref = this.dataset.ref || null;
    //     this.size = this.value ? this.value.length : 6;
    //     (this.parentElement as HTMLFormElement).classList.toggle("unchanged", this.value.trim() === ref);
    // }
    
    let modifying = false;
    let imgState = 0;

    function imgError(msg: string) {
        form = { success: false, picture: msg };
    }
    const getSizeFromImgURL = (url: string) => new Promise<{width: number, height: number}>(resolve => {
        const img = new Image();
        img.onload = () => resolve({
            height: img.height,
            width: img.width
        });
        img.src = url;
    });
    async function onfile(this: HTMLInputElement) {
        const f = this.files ? this.files.item(0) : null;
        if(!f) return imgError("No file was selected");
        if(f.type !== "image/jpeg") return imgError(`The file type must be a jpeg (got ${f.type})`);
        if(f.size > 512000) return imgError(`Size of ${(f.size*1e-3).toFixed(0)}KB exceeds the maximum of 500KB`);
        imgState = 1;
        if(form?.picture) form = null;
        const url = URL.createObjectURL(f);
        const size = await getSizeFromImgURL(url);
        if(size.width === size.height) {
            imgState = 2;
            considering = url;
        }
        else {
            imgState = 0;
            imgError(`The selected picture is not square (${size.width}\u00D7${size.height} pixels)`);
        }
    }
    function onreset(this: HTMLFormElement) {
        imgState = 0;
        considering = null;
    }
    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        if(imgState !== 2) return;
        const f = formData.get("picture");
        if(!(f instanceof File)) return;
        imgState = 1;
        const res = await data.supabase.storage.from("people-pics").upload(`${data.person.id}.jpeg`, f, { upsert: true });
        imgState = 0;
        if(res.error) {
            console.log(res.error);
            imgError(res.error.message);
            considering = null;
        }
        else {
            picture.refresh();
        }
    }
</script>

<svelte:head>
    <title>Your Account | PRT Admin Program</title>
</svelte:head>


<h1>Your account</h1>

<h2>Picture</h2>
<p>This is the picture used in the website to represent you: please make sure your face is clearly visible even in small sizes. Moreover, the file must be a <b>jpeg</b> with size <b>less than 500KB</b> and the picture must be square. The first size is for the future alumni page, the second is the size of lead pictures in the current team page, while the last is simply extra small.</p>

<div class="imgs">
    <img src={considering || $picture} alt="Hopefully your face" data-seed={data.person.first_name} style:--size="12rem" on:error={fiximg}>
    <img src={considering || $picture} alt="Hopefully your face" data-seed={data.person.first_name} style:--size="7.2rem" on:error={fiximg}>
    <img src={considering || $picture} alt="Hopefully your face" data-seed={data.person.first_name} style:--size="4rem" on:error={fiximg}>
</div>

<form action="?/pic" method="post" on:reset={onreset} use:enhance={submit}>
    <label class="btn" class:hidden={imgState !== 0}>
        <input type="hidden" name="person-id" value={data.person.id}>
        <input type="file" name="picture" accept="image/jpeg" on:input={onfile}>
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
    <li>Official email: <a href="mailto:{email}" target="_blank" rel="noreferrer">{email}</a></li>
    

    <li>
        <span>LinkedIn profile:</span>
        <div class="linkdid-form-container">
            {#if modifying}
            <!-- editing view of linkedin profile - showing form -->
            <form action="?/linkedin" method="post" class="oneliner unchanged" use:enhance={async ({ cancel, formElement, formData }) => {
                cancel();
                const v = formData.get("username");
                if( (typeof v !== "string") && (v !== data.person.linkedin) ) return;
                const res = await data.supabase.from("people").update({ linkedin: v }).eq("id", data.person.id);
                if(res.error) return;
                data.person.linkedin = v;
                // formElement.dataset.ref = v;
                // formElement.classList.add("unchanged");
                modifying = false;
            }}>
                <span >
                    <label for="linkedin " class="btn">
                        <span>linkedin.com/in/</span>
                        <input 
                            type="text" 
                            name="username" 
                            id="linkedin" 
                            placeholder="Not set" 
                            autocomplete="off"
                            class="inline" 
                            value={data.person.linkedin} 
                            size={data.person.linkedin?.length || 6}
                            data-ref={data.person.linkedin} 
                            
                            >
                    </label>
                </span>
                <button class="btn" type="submit">Save</button>
                <button class="btn btn--low" on:click={()=>{modifying = !modifying}}>Cancel</button>
            </form>
            
            {:else}
                <!--  default view - not modifying -->
                {#if data.person.linkedin}
                <a class="btn linkdin-url-link" href="https://www.linkedin.com/in/{data.person.linkedin}" target="_blank" rel="noreferrer">linkedin.com/in/{data.person.linkedin}</a>
                {:else}
                <span class="low">not set</span>
                {/if}
            {/if}

            {#if !modifying}
                <button class="btn " on:click={()=>{modifying = !modifying}}>Edit</button>
            {/if}
            
        </div>
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
        border-radius: .4rem;
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
    .oneliner {
        display: flex;
        align-items: center;
        gap: 1ch;
    }
    .oneliner.unchanged button {
        /* display: none; */
    }
    ul.no-list {
        list-style: none;
    }
    .no-list li {
        margin-bottom: .4rem;
    }
 
    label > input {
        display: none;
    }

    input.inline {
        display: inline;
        padding: 0;
        border: 0;
        max-width: 100%;
        
    }

    .hidden {
        display: none;
    }




    /* ------------ */
    .linkdid-form-container {
        margin-top: .4rem;
        display: flex;
        align-items: flex-start;
        gap: 1ch;
 
    }
    .linkdid-form-container a {
        border: none;
        padding-left: 0;
    }
    .linkdid-form-container input {
        width: 100%;
    }
    .linkdin-url-link:hover {
        background-color: initial;
        color:   rgb(216, 82, 9);

 
    }
 
</style>