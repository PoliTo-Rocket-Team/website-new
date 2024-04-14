<script lang="ts">
    import Event from "./Event.svelte";
    import events from "./events.json"
</script>

<main>
    <h1>History</h1>
    <hr class="subtle stop-growth" />

    <section aria-labelledby="events">
        <div>
            <Event data = {events}/>
        </div>
    </section>
</main>
