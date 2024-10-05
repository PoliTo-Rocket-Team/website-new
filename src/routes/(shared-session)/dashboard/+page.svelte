<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
    import Follow3D from "$lib/Follow3D.svelte";
    import { fiximg } from "$lib/dashboard-utils";

    export let data: PageData;

    const transform = (x: number, y: number) =>
        `rotate3d(${-y},${x},0,${-15 * Math.hypot(x, y)}deg)`;
</script>

<svelte:head>
    <title
        >{data.person ? data.person.first_name + "'s panel | " : ""} PRT admin program</title
    >
</svelte:head>

<main>
    {#if !data.person}
        <h1>Hi!</h1>
        <p>
            It seems like there's still no user data linked to your user id. In
            the future the invitation process will be entirely automatic, but in
            the meantime please notify the IT lead of your situation.
        </p>
        <p style="margin-top: .5rem;">
            User ID: <b>{data.user.id}</b><br />Email: <b>{data.user.email}</b>
        </p>
        <form
            action="/auth/logout"
            method="post"
            use:enhance={async ({ cancel }) => {
                cancel();
                await data.supabase.auth.signOut();
                goto("/auth/login");
            }}
        >
            <button type="submit">Logout</button>
        </form>
    {:else}
        <h1>Welcome back {data.person.first_name}!</h1>

        <div class="cards">
            {#if data.person.chief_of}
                {@const s = data.person.chief_of}
                <article>
                    <Follow3D {transform}>
                        <a href="/dashboard/subteam/{s.id}">
                            <span class="water">{s.code}</span>
                            <h2>{s.name}</h2>
                        </a>
                    </Follow3D>
                </article>
            {/if}
            {#each data.person.lead_of as d}
                <article>
                    <Follow3D {transform}>
                        <a href="/dashboard/positions/{d.id}">
                            <span class="water">{d.code}</span>
                            <h2>{d.name}</h2>
                        </a>
                    </Follow3D>
                </article>
            {/each}
            <article>
                <Follow3D {transform}>
                    <a href="/dashboard/bureaucracy">
                        <svg
                            width="800px"
                            height="800px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke="var(--accent-fig)"
                            >
                                <path d="M8 12H9M16 12H12" />
                                <path d="M16 8H15M12 8H8" />
                                <path d="M8 16H13" />
                                <path
                                    d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C20.4816 3.82476 20.7706 4.69989 20.8985 6M21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3.51839 20.1752 3.22937 19.3001 3.10149 18"
                                />
                            </g>
                        </svg>
                        <h2>Bureaucracy</h2>
                    </a>
                </Follow3D>
            </article>
            <article>
                <Follow3D {transform}>
                    <a href="/dashboard/orders">
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g stroke="var(--accent-fig)" stroke-width="1.5">
                                <path
                                    d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                />
                                <path
                                    d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                />
                                <path
                                    d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                                    stroke-linecap="round"
                                />
                            </g>
                        </svg>
                        <h2>Orders</h2>
                    </a>
                </Follow3D>
            </article>
            <article>
                <Follow3D {transform}>
                    <a href="/dashboard/account">
                        <img
                            src={data.pic}
                            alt="Hopefully your face"
                            data-seed={data.person.first_name}
                            on:error={fiximg}
                        />
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
        padding: 0.4rem 0.7rem;
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
            flex-wrap: wrap;
        }
        article {
            margin: 2rem;
            min-width: 20rem;
        }

        a {
            /* perspective: var(--perspective); */
            transform-style: preserve-3d;
        }
        h2,
        .water,
        img,
        svg {
            transition: transform 0.2s;
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
