<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
    import Follow3D from "$lib/Follow3D.svelte";

    export let data: PageData;

    const space = /\s/;
    function correct(v: string) {
        return v.toLowerCase().replace(space,'');
    }

    const transform = (x: number, y: number) => `rotate3d(${-y},${x},0,${-15*Math.hypot(x,y)}deg)`;

    function fiximg(this: HTMLImageElement) {
        this.src = "https://api.dicebear.com/7.x/micah/svg?backgroundColor=transparent&seed="+data.person?.first_name;
    }
</script>

<svelte:head>
    <title>{data.person ? data.person.first_name + "'s panel | " : ""} PRT admin program</title>
</svelte:head>

<main>
    {#if !data.person}
        <h1>Hi!</h1>
        <p>It seems like there's still no user data linked to your user id. In the future the invitation process will be entirely automatic, but in the meantime please notify the IT lead of your situation.</p>
        <p style="margin-top: .5rem;">User ID: <b>{data.user.id}</b><br>Email: <b>{data.user.email}</b></p>
        <form action="/auth/logout" method="post" use:enhance={async ({ cancel }) => {
            cancel();
            await data.supabase.auth.signOut();
            goto("/auth/login");
        }}>
            <button type="submit">Logout</button>
        </form>
    {:else}
        <h1>Welcome back {data.person.first_name}!</h1>

        <div class="cards">
            <article>
                <Follow3D {transform}>
                    <a href="/dashboard/account">
                        <img src={data.pic} alt="Hopefully your face" on:error={fiximg}>
                        <h2>Account</h2>
                    </a>
                </Follow3D>
            </article>
            {#each data.divisions as d}
                <article>
                    <Follow3D {transform}>
                        <a href="/dashboard/positions/{d.id}">
                            <span class="water">{d.code}</span>
                            <h2>{d.name}</h2>
                        </a>
                    </Follow3D>
                </article>
            {/each}
            {#each data.subteams as s}
                <article>
                    <Follow3D {transform}>
                        <a href="/dashboard/positions/{s.id}">
                            <span class="water">{s.code}</span>
                            <h2>{s.name}</h2>
                        </a>
                    </Follow3D>
                </article>
            {/each}
        </div>
    {/if}
</main>

<style>
    /* main {
        padding:  max(1rem, 50vw - 45ch);
    } */
    h1 {
        text-align: center;
    }
    button {
        color: var(--accent-text);
        padding: .4rem .7rem;
        border: 1px solid var(--accent-text);
        margin-top: 1rem;
    }
    article {
        height: 20rem;
        width: 20rem;
        max-width: 100%;
        margin-bottom: 2rem;
    }
    a {
        /* overflow: hidden; */
        position: relative;
        border-radius: 1.5rem;
        border: 2px solid #8882;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        text-decoration: none;
        color: inherit;
        z-index: 1;
    }
    h2 {
        text-align: center;
        margin-bottom: 0;
        z-index: 1;
    }
    .cards {
        display: flex;
        flex-direction: column;
        align-items: center;
        --perspective: 30rem;
    }
    @media (min-width: 50rem) {
        .cards {
            flex-direction: row;
            justify-content: center;
        }
        article {
            margin: 2rem;
        }

        a {
            /* perspective: var(--perspective); */
            transform-style: preserve-3d;
        }
        h2, .water, img {
            transition: transform .2s;
        }
        h2 {
            transform: translateZ(0rem);
        }
        a:hover h2 {
            transform: translateZ(4rem);
        }
        a:hover .water {
            transform: translate3d(-50%, -50%, -4rem);
        }
        a:hover img {
            transform: translateZ(-4rem);
        }
    }
    img {
        position: absolute;
        inset: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        object-fit: cover;
        z-index: -1;
        filter: blur(4px);
        opacity: 0.7;
        border-radius: calc(1.5rem - 10px);
    }
    .water {
        z-index: -1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0rem);
        font-weight: 600;
        color: var(--accent-fig);
        font-size: 12rem;
        opacity: 0.5;
        width: max-content;
    }
</style>