<script lang="ts">
    import Wrapper from "./Wrapper.svelte";
    import Header from "./PublicHeader.svelte";
    import Content from "./Content.svelte";
    import Disclaimer from "./Disclaimer.svelte";

    export let name: string;
    export let subteam: string;
    export let division: string;
    export let code: string;
    export let description: string;
    export let desirable: string[];
    export let required: string[];
    export let form: string;
</script>

<Wrapper>
    <Header 
    role={name} {subteam} {division} {code} slot="header" />
    <svelte:fragment slot="content">
        <Content name={name} division={division} {description} required={required} desirable={desirable} form={form} />
        <Disclaimer />
    </svelte:fragment>
</Wrapper>
