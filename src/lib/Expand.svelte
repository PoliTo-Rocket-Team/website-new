<script context="module">
    import { browser } from "$app/environment";
    if(browser) {
        function csbw(){
            document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
        }
        if(document.readyState === "complete") csbw();
        else {
            window.addEventListener("DOMContentLoaded", csbw, false);
            window.addEventListener("load", csbw);
        }
    }
</script>

<div class="container">
    <div class="shift">
        <div class="clip-zone">
            <slot />
        </div>
    </div>
</div>

<style>
    .container {
        max-width: 100%;
        position: relative;
    }
    .shift {
        /* transform: translateX(calc(50% - 0.5*var(--size))); */
        transform: translateX(calc(50% - 50vw + 0.5 * var(--scrollbar-width)));
        width: 100%;
        overflow-x: visible;
    }
    .clip-zone {
        overflow: hidden;
        width: calc(100vw - var(--scrollbar-width));
    }
</style>