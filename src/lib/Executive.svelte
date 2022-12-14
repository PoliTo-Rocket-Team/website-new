<script lang="ts">
    export let name: string, role: string, img: string, linkedin: string, mail: string;
</script>

<div class="key-figure">
    <img src="/img/members/{img}" alt="{name} nicely dressed">
    <div class="body">
        <div class="text">
            <h3 class="name">{name}</h3>
            <span class="role">{role}</span>
            <slot></slot>
        </div>
        <ul class="contacts">
            <li>
                <a class="social social--explicit" href="https://www.linkedin.com/in/{linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                        <use href="#linkedin-icon"></use>
                    </svg>
                    <span>LinkedIn</span>
                </a>
            </li>
            <li>
                <a class="social social--explicit" href="mailto:{mail}" target="_blank" rel="noreferrer" aria-label="Email" title="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50">
                        <use href="#email-icon"></use>
                    </svg>
                    <span>Email</span>
                </a>
            </li>
        </ul>
    </div>
</div>

<style>
    .key-figure {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        background-color: var(--bg-1);
        border-radius: .6rem;
        overflow: hidden;
    }
    .role {
        font-size: var(--fs-50);
        font-weight: 600;
        color: var(--accent-text);
    }
    img {
        max-width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
    }
    .name {
        font-size: var(--fs-65);
    }
    .body {
        padding: 1rem;
    }
    .contacts {
        margin-top: .7rem;
        list-style: none;
        --bg: var(--bg-1);
        --fg: var(--fg-1);
    }
</style>