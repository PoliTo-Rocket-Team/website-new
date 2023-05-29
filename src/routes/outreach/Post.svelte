<script lang="ts">
    export let date: string;
    export let title: string;
    export let img: string;
    export let url: string;

    const formatter = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" });
</script>

<article>
    <a href={url} tabindex="-1" class="img" target="_blank" rel="noopener">
        <img src={img} alt="Post image of {title}">
    </a>
    <div class="text">
        <time datetime={date}>{formatter.format(new Date(date))}</time>
        <h3>{title}</h3>
        <div class="body">
            <slot />
        </div>
        <a href={url} class="cta" target="_blank" rel="noopener">Read more</a>
    </div>
</article>

<style>
    article {
        background-color: var(--bg-1);
        border-radius: 0.5rem;
    }
    .img {
        display: block;
        border-radius: 0.5rem;
        overflow: hidden;
    }
    .text {
        padding: 1.2rem;
        padding-top: 0.9rem;
    }
    img {
        display: block;
        max-width: 100%;
        transform: scale(1);
        transition: transform 0.2s ease;
    }
    img:hover {
        transform: scale(1.05);
    }
    h3 {
        font-size: var(--fs-65);
        margin-bottom: .8rem;
    }
    .cta {
        display: block;
        width: fit-content;
        margin-top: .8rem;
        text-decoration: none;
        padding: .4rem .8rem;
        border: 2px solid var(--accent-fig);
    }
</style>