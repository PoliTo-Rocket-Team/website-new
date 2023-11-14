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


    let isLink = false;
    let linkedin = (data.person.linkedin)?.toString();
    function checkLinkdinId (this: HTMLInputElement) {
        if (isLink){
            const regex = /linkedin\.com\/in\/([^\/?]+)/;
            const match = (this.value)?.toString().match(regex);
            if (match){
                linkedin = match[1].replace("linkedin.com/in/", "");
            }
            else{
                linkedin = this.value;
            }

        }
        else{
            linkedin = this.value;

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
    <li>
        <span>Official email:</span>
        <a href="mailto:{email}" target="_blank" rel="noreferrer">{email}</a>
    </li>
    

    <li>

                    
        
            <span>LinkedIn profile:</span>

                {#if data.person.linkedin}
                <a class="" href="https://www.linkedin.com/in/{linkedin}" target="_blank" rel="noreferrer">linkedin.com/in/{linkedin}</a>
                {:else}
                <span class="low">not set</span>
                {/if}

            </li> 
            {#if !modifying}
                <button class="btn " on:click={()=>{modifying = !modifying}}>Edit</button>

            {:else}
            <li>
                <form action="?/linkedin" method="post" class="oneliner linkedin-form">
                    <div class="linkedin-prompt">
                        <p>Please select the input type :</p>
                        <span>
                            <input on:click={()=>{isLink=true}} type="radio" id="link" name="isLink" >
                            <label for="link">Link</label>
                        </span>
                        <span>
                            <input on:click={()=>{isLink=false}} type="radio" id="id" name="isLink" checked>
                            <label for="id">Id</label>
                        </span>
                    </div>


                    <label for="linkedin " class="">
                        <input 
                            type="text" 
                            name="username" 
                            id="linkedin" 
                            
                            autocomplete="off"
                            class="inline" 
                            value={ isLink ? ( (linkedin==="")? "" : "linkedin.com/in/" + linkedin) : linkedin} 
                            placeholder="not set"
                            on:input={checkLinkdinId}
                            data-ref={data.person.linkedin}>
                        </label>
                            
                            
                    <div class="linkedin-form-btn">
                        <button class="btn" type="submit">Save</button>
                        <button class="btn btn--low" on:click={()=>{modifying = !modifying; isLink= false;linkedin = (data.person.linkedin)?.toString()}}>Cancel</button>
                    </div>
                        

            </form>
        
            </li>
            {/if}
            
  

   
    {#if form?.username}
    <li>
        <p class="error">{form.username}</p>
    </li>
    {/if}
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
    /* .oneliner.unchanged button {
        display: none;
    } */
    ul.no-list {
        list-style: none;
        

    }
    .no-list li {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0;
    }
    .no-list li span:first-child {
        min-width: 10ch;
    }
 
    label > input {
        display: none;
    }

    input.inline {
        display: inline;
        padding: 0;
        border: 0;

        width: 20rem;
        padding: 5px 7px;
        border: 2px solid var(--accent-fig);
        border-radius: 15px;


        
    }

    .hidden {
        display: none;
    }

    .linkedin-form{
        border: 2px solid rgb(197, 186, 186);
        border-radius: 15px;
        display: flex;
        align-items: flex-start;
        width: 30rem;
        flex-direction: column;
        padding: 1rem;

    }
    .linkedin-form-btn{
        display: flex;
        justify-content: center;
        gap: 1rem;
        width: 100%;
    }
   .linkedin-prompt{
        display: flex;
        gap: 1rem;
    }


</style>