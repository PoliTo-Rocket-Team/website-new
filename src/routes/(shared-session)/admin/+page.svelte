<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";

    export let data: PageData;

    const space = /\s/;
    function correct(v: string) {
        return v.toLowerCase().replace(space,'');
    }
</script>

<svelte:head>
    <title>{data.person ? data.person.first_name + "'s panel | " : ""} PRT admin program</title>
</svelte:head>

<main>
    {#if !data.person}
        <h1>Hi!</h1>
        <p>It seems like there's no user data linked to your user id. If you're not a robot, you should notify the IT lead of your situation.</p>
        <p style="margin-top: .5rem;">User ID: <b>{data.session?.user.id}</b><br>Email: <b>{data.session?.user.email}</b></p>
        <form action="/auth/logout" method="post" use:enhance={async ({ cancel }) => {
            cancel();
            await data.supabase.auth.signOut();
            goto("/auth/login");
        }}>
            <button type="submit">Logout</button>
        </form>
    {:else}
        {@const mail = `${correct(data.person.first_name)}.${correct(data.person.last_name)}@politorocketteam.it`}
        <h1>Welcome back {data.person.first_name}!</h1>
        <div class="split">
            <aside>
                <ul class="links">
                    <li><a href="#account">Account</a></li>
                    <li><a href="#positions">Positions</a></li>
                </ul>
                <form action="/auth/logout" method="post" use:enhance={async ({cancel}) => {
                    cancel();
                    await data.supabase.auth.signOut();
                    setTimeout(()=>goto("/auth/login"), 1);
                }}>
                    <button type="submit">Logout</button>
                </form>
            </aside>
            <div class="body">
                <section aria-labelledby="account">
                    <h2 id="account">Account</h2>
                    <span class="name">{data.person.first_name} {data.person.last_name}</span>
                    <ul class="titles">
                        {#each data.subteams as s}
                            <li>{s.title}</li>
                        {/each}
                        {#each data.divisions as d}
                            <li>{d.name} Lead {d.acting ? "(acting)":''}</li>
                        {/each}
                    </ul>
                    <h3>Contacts</h3>
                    <table>
                        <tr>
                            <td>Personal mail:</td>
                            <td><a href="mailto:{data.session?.user.email}">{data.session?.user.email}</a></td>
                        </tr>
                        <tr>
                            <td>Official mail:</td>
                            <td><a href="mailto:{mail}">{mail}</a></td>
                        </tr>
                        <tr>
                            <td>LinkedIn user:</td>
                            <td>
                                {#if data.person.linkedin}
                                <a href="http://www.linkedin.com/in/{data.person.linkedin}" target="_blank">{data.person.linkedin}</a>
                                {:else}
                                <span class="low">none</span>
                                {/if}
                            </td>
                        </tr>
                    </table>
                    <button type="button">Modify</button>
                </section>
                <section aria-labelledby="account">
                    <h2 id="account">Positions</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Division</th>
                                <th>Name</th>
                                <th>Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.positions as p}
                                <tr>
                                    <td>{p.division?.name}</td>
                                    <td>{p.name}</td>
                                    <td>{p.division?.code}-{p.number.toString().padStart(3,'0')}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                    <button type="button">Add new position</button>
                </section>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        padding: max(1rem, 50vw - 45ch);
    }
    .split {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: start;
    }
    aside {
        text-align: right;
        padding: 1rem 1.7rem;
        border-right: 2px solid #888;
        min-height: 40vh;
        position: sticky;
        top: 25vh;
    }
    .links {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    .links a {
        text-decoration: none;
        font-size: 1.3rem;
        font-weight: 500;
    }
    .body {
        padding: var(--pad);
    }
    section {
        margin-top: 0;
        margin-bottom: 7rem;
    }
    button {
        color: var(--accent-text);
        padding: .4rem .7rem;
        border: 1px solid var(--accent-text);
        margin-top: 1rem;
    }
    h3 {
        margin-top: 1rem;
        margin-bottom: .3rem;
    }
</style>