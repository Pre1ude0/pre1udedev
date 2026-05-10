<script lang="ts">
    import { blur } from "svelte/transition";
    import Window from "$lib/components/Window.svelte";
    import { enhancedImages } from "$lib/assets/enhancedImage";
    const highlights = [
        {
            file: "laurandiego.png",
            alt: "Laura & Diego",
            author: "Diego Sterling",
            authorUrl: "https://thesterlings.straw.page/diego",
        },
    ];
</script>

<div
    class="flex flex-row flex-wrap items-center justify-center gap-6 p-10 relative h-fit"
>
    {#each highlights as h, i}
        <Window
            width={600}
            path="fanart"
            command={`icat ${h.file} && file ${h.file} `}
        >
            <img
                class="[filter:drop-shadow(2px_2px_0_white)_drop-shadow(-2px_-2px_0_white)] mb-3"
                src={enhancedImages[`fanart/${h.file}`]}
                alt={h.alt}
            />
            <span class="text-sm text-zinc-400">
                Art by <a
                    class="underline"
                    href={h.authorUrl}
                    target="_blank"
                    rel="noreferrer">{h.author}</a
                >
            </span>
        </Window>
    {/each}
</div>
