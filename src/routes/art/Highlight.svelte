<script lang="ts">
    import { blur } from "svelte/transition";
    let highlightContainer: HTMLDivElement;
    let visible = $state(true);

    import Eye from "$lib/icons/Eye.svelte";
    import EyeClosed from "$lib/icons/EyeClosed.svelte";

    const highlights = [
        {
            url: "laurandiego.png",
            alt: "Laura & Diego",
            author: "Diego Sterling",
            authorUrl: "https://thesterlings.straw.page/diego",
        },
    ];
</script>

<svelte:head>
    <link
        rel="preload"
        as="image"
        href={`/art/highlights/${highlights[0].url}`}
    />
</svelte:head>

<div
    class="pointer-events-none fixed bottom-0 right-0 z-100 h-fit w-180 max-w-[90vw] transition-all"
    transition:blur={{ duration: 300 }}
    bind:this={highlightContainer}
    style:visibility={visible ? "visible" : "hidden"}
    style:opacity={visible ? 1 : 0}
    style:blur={visible ? "0px" : "8px"}
>
    <enhanced:img
        src={`/art/highlights/${highlights[0].url}`}
        alt={highlights[0].alt}
        class="[filter:drop-shadow(2px_2px_0_white)_drop-shadow(-2px_-2px_0_white)]"
    />
</div>
<div class="fixed bottom-0 right-1 p-3 flex flex-row gap-2 z-110">
    <div
        class="bg-zinc-800 p-1 px-2 rounded-sm transition-all duration-50"
        style:visibility={visible ? "visible" : "hidden"}
        style:opacity={visible ? 1 : 0}
        style:blur={visible ? "0px" : "8px"}
    >
        <small class="text-zinc-400">Art by </small>
        <a
            href={highlights[0].authorUrl}
            class="text-zinc-200 hover:underline"
            target="_blank"
        >
            {highlights[0].author}
        </a>
    </div>
    <button
        class="bg-zinc-800 text-zinc-200 p-1 rounded-sm cursor-pointer"
        onclick={() => {
            visible = !visible;
        }}
    >
        {#if visible}
            <Eye styles />
        {:else}
            <EyeClosed styles />
        {/if}
    </button>
</div>
