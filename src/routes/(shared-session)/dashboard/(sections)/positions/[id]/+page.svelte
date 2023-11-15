<script>
	/** @type {import('./$types').PageData} */
    import Position from "$lib/components/apply-page/Position.svelte";
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	export let data;
	let modify = false;

     async function handelDelete(event) {

		let data =event.detail;
		const response = await fetch(`/api/positions/${data.id}/delete/`, {
			method: 'POST',
			body: JSON.stringify( {data}  ),
			headers: {
				'content-type': 'application/json'
			}
		});

		let total = await response.json();
		console.log("total : ",total);  
    }

 


	async function edit (event) {
		// console.log(event.detail.description);
		let data =event.detail;
		const response = await fetch(`/api/positions/${data.id}/add/`, {
			method: 'POST',
			body: JSON.stringify( {data}  ),
			headers: {
				'content-type': 'application/json'
			}
		});

		let total = await response.json();
		console.log("total",total);

	}
    



</script>

<svelte:head>
    <title> Positions | PRT Admin Program</title>
</svelte:head>

<h1  >{data.divisions[0].name} Positions</h1>
{#if !data.positions.length === 0}


<section aria-labelledby="positions" class="positions">
	<h2 id="positions">Open positions</h2>
	<div class="position-labels on-lg" aria-hidden="true">
		<span>Role</span>
		<span></span>
		<span></span>
		<div class="code-label"><span>Code</span></div>
	</div>


	{#each data.positions as pos}
	

        <Position on:submitEdit={edit} on:delete={handelDelete} role={pos.name} id={pos.id}  desirable={pos.desirable} required={pos.required} description={pos.description} subteam={""} division={""} code={`${data.subteam[0].code}-${data.divisions[0].code}-${pos.number}`}>
		
        </Position>

	{/each}
<button></button>


</section>
{:else}
<p>No positions found.</p>
{/if}


<style lang="scss">
    @use  "$lib/components/apply-page/consts.scss" as *;
    
    section {
        max-width: 75ch;
        margin-left: auto;
        margin-right: auto;
    }

    .code-label {
        font-family: 'Anonymous Pro', monospace;
        width: 11ch;
        max-width: 11ch;
        min-width: 11ch;
    }
    
    $text-margin: 0.5rem;
    .positions {
        h4:not(:first-child) { margin-top: 3*$text-margin; }
        h4 { margin-bottom: $text-margin; }
        p + ul { margin-top: 0.5*$text-margin; }
        ul + p, p + p { margin-top: $text-margin; }
        ul { padding-left: 2ch;}
    }
    .btn {
        display: block;
        padding: .4em .7em;
        border: 2px solid var(--accent-fig);
        width: fit-content;
        text-decoration: none;
        font-weight: 600;
        margin: 2rem auto;
    }
    .btn:focus {
        text-decoration: underline;
    }
    @media (min-width: 50rem) {
        h2 {text-align: center;}
        .position-labels {
            padding: $details-pad-y $details-pad-x;
            display: grid;
            grid-template-columns: $details-columns;
            grid-auto-flow: dense;
            align-items: center;
            column-gap: $gap;
        }
    }


</style>

