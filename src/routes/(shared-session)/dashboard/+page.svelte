<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
    import Follow3D from "$lib/Follow3D.svelte";
    import { fiximg } from "$lib/dashboard-utils";

    export let data: PageData;

    const transform = (x: number, y: number) => `rotate3d(${-y},${x},0,${-15*Math.hypot(x,y)}deg)`;
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
            <article>
                <Follow3D {transform}>
                    <a href="/dashboard/account">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,255.98959,255.98959" style="fill:#000000;">
                            <path d="M0,255.98959v-255.98959h255.98959v255.98959z"  fill-opacity="0"  fill="#000000" fill-rule="nonzero" stroke="none"></path>
                            <g transform="scale(8.53333,8.53333)" fill="var(--accent-fig)" fill-rule="nonzero" stroke="none">
                                <path d="M24.707,8.793l-6.5,-6.5c-0.188,-0.188 -0.442,-0.293 -0.707,-0.293h-10.5c-1.105,0 -2,0.895 -2,2v22c0,1.105 0.895,2 2,2h16c1.105,0 2,-0.895 2,-2v-16.5c0,-0.265 -0.105,-0.519 -0.293,-0.707zM18,21h-8c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1h8c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1zM20,17h-10c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1h10c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1zM18,10c-0.552,0 -1,-0.448 -1,-1v-5.096l6.096,6.096z"></path>
                            </g>
                        </svg>
                        <h2>Bureaucracy</h2>
                    </a>
                </Follow3D>
            </article>
            <article>
                <Follow3D {transform}>
                    <a href="/dashboard/account">
                        <img src={data.pic} alt="Hopefully your face" data-seed={data.person.first_name} on:error={fiximg}>
                        <h2>Account</h2>
                    </a>
                </Follow3D>
            </article>
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
        margin: 0;
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
        h2, .water, img, svg {
            transition: transform .2s;
        }
        h2 {
            transform: translateZ(0rem);
        }
        a:hover h2 {
            transform: translateZ(4rem);
        }
        a:hover .water {
            transform: translate3d(-50%, -50%, -16rem) scale(2);
        }
        a:hover img {
            transform: translateZ(-4rem);
        }
        a:hover svg {
            --z-shift: -4rem;
            filter: blur(0);
        }
    }
    svg {
        position: absolute;
        z-index: -1;
        opacity: 0.5;
        filter: blur(4px);
        top: 50%;
        left: 50%;
        width: 75%;
        height: 75%;
        --z-shift: 0rem;
        transform: translate3d(-50%, -50%, var(--z-shift));
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
        font-size: 8rem;
        opacity: 0.5;
        width: max-content;
    }
</style>