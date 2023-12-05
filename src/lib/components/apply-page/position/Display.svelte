<script lang="ts">
    import Wrapper from "./Wrapper.svelte";
    import Header from "./PublicHeader.svelte";
    import Content from "./Content.svelte";
    import Disclaimer from "./Disclaimer.svelte";

    export let role: string;
    export let subteam: string;
    export let division: string;
    export let code: string;
    export let description: string;
    export let desirable: string[];
    export let required: string[];
    export let form: string;
</script>

<Wrapper>
    <Header {role} {subteam} {division} {code} slot="header" />
    <svelte:fragment slot="content">
        <Content {description} {required} {desirable} {form} />
        <Disclaimer />
    </svelte:fragment>
</Wrapper>
