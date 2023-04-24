<script lang="ts">
    import { Svelvet, Node } from "svelvet";
    import { theme } from "$lib/theme";
</script>

<div class="wrapper">
    <Svelvet theme={$theme}>
        <Node locked>
            <div class="lead">
                <span class="name">Fabio Meloni</span>
                <span class="title">President</span>
            </div>
        </Node>
        <Node locked position={{x: 500, y: 0}}>
            <div class="lead">
                <span class="name">Luca Santoro</span>
                <span class="title">Chief Technologist</span>
            </div>
        </Node>
        <Node locked position={{x: -500, y:0}}>
            <div class="lead">
                <span class="name">Elena Dilorenzo</span>
                <span class="title">Chief Operating Officer</span>
            </div>
        </Node>
    </Svelvet>
</div>

<style>
    .wrapper {
        height: 30rem;
    }

    .lead {
        background-color: var(--bg-1);
        color: var(--fg-1);
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: 0.5rem;
    }
</style>