<script>
    import RequestForm from "$lib/RequestPage/RequestForm.svelte";
    export let data;
</script>

<svelte:head>
    <title>Orders | PRT Admin Program</title>
</svelte:head>
<h1>Orders</h1>

<RequestForm requester={data.requesterId} supabase={data.supabase} />

<style>
</style>
