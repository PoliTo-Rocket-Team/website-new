<script lang="ts">
    export let description: string;
    export let reason: string | null;
    export let quoteName: string | null;
    export let createdAt: string | null;
    import { getContext } from "svelte";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import type { Database } from "$lib/supabase";
    const supabase = getContext<SupabaseClient<Database>>("supabase");

    $: paragraphs = description.split("\n\n");
    $: reasonParagraphs = reason ? reason.split("\n\n") : [];

    $: formattedDate = createdAt
        ? `${new Date(createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })}, ${new Date(createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // 24-hour format
          })}`
        : "N/A";

    let signedUrl = "";

    async function generateSignedUrl() {

        if (!quoteName) {
            console.error("quoteName is not set");
            return;
        }

        const { data, error } = await supabase.storage
            .from("quotes")
            .createSignedUrl(quoteName, 600); // URL valid for 600 seconds

        if (error) {
            console.error("Error generating signed URL:", error.message);
            return;
        }

        signedUrl = data.signedUrl;
        window.open(signedUrl, "_blank");
    }
</script>

<h4>Description</h4>
{#each paragraphs as p}
    <p>
        {#each p.split(/((?:https?:\/\/)?(?:www\.)?[^\s]+\.[^\s]+)/g) as segment}
            {#if segment.match(/^(?:https?:\/\/)?(?:www\.)?\S+\.[^\s]+$/)}
                <a
                    href={segment.startsWith("http")
                        ? segment
                        : `https://${segment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {segment.length > 40
                        ? segment.substring(0, 40) + "..."
                        : segment}
                </a>
                <br />
            {:else}
                {segment}
            {/if}
        {/each}
    </p>
{/each}
<h4>Reason</h4>
{#each reasonParagraphs as p}
    <p>{p}</p>
{/each}

{#if quoteName}
    <h4>Quote</h4>

    <button class="btn" on:click={generateSignedUrl}>{quoteName}</button>
{/if}

{#if createdAt}
    <h4>Created At</h4>
    <p>{formattedDate}</p>
{/if}

<style>
    h4:not(:first-child) {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
    }
    p {
        margin-top: 0.5rem;
    }
</style>
