<script lang="ts">
    import Characters from "./Characters.svelte";
    import Music from "./Music.svelte";
    import Highlight from "./Highlight.svelte";
    import { blur } from "svelte/transition";

    let section: "art" | "music" = $state("art");

    let artBtn: HTMLButtonElement;
    let musicBtn: HTMLButtonElement;
    let underlineLeft = $state(0);
    let underlineWidth = $state(0);

    // Update underline position when section changes
    $effect(() => {
        const btn = section === "art" ? artBtn : musicBtn;
        if (btn) {
            const rect = btn.getBoundingClientRect();
            const parentRect = btn.parentElement!.getBoundingClientRect();
            underlineLeft = rect.left - parentRect.left;
            underlineWidth = rect.width;
        }
    });
</script>

<svelte:head>
    <meta property="og:title" content="Art gallery - Laura☾" />
    <meta property="og:url" content="https://pre1ude.dev/art" />
    <meta property="og:image" content="https://pre1ude.dev/og-image.png" />
    <meta
        property="og:description"
        content="A collection of art I've made featuring my characters and ocs."
    />
</svelte:head>

<Highlight />

<div class="flex flex-col gap-3 min-h-[100vh] p-2 overflow-hidden">
    <h1 class="text-6xl text-white mb-3">Art gallery</h1>
    <p class="text-lg text-white mb-3">
        For a bit of context: I started drawing very recently (end of summer
        2025) and I still have a shit load to learn :]<br />
        I do digital, a little bit of traditional and music production alongside software
        development.
    </p>
    <div
        class="flex flex-row gap-2 relative selector-container group w-fit"
        style="height: 48px;"
    >
        <button
            class="font-bold text-zinc-200 text-2xl cursor-pointer px-3 py-1 bg-transparent hover:bg-zinc-800 transition-all rounded-sm"
            onclick={() => (section = "art")}
            aria-pressed={section === "art"}
            bind:this={artBtn}
        >
            Art
        </button>
        <button
            class="font-bold text-zinc-200 text-2xl cursor-pointer px-3 py-1 bg-transparent hover:bg-zinc-800 transition-all rounded-sm"
            onclick={() => (section = "music")}
            aria-pressed={section === "music"}
            bind:this={musicBtn}
        >
            Music
        </button>
        <div
            class="selector-underline bg-zinc-400 h-[3px] group-hover:bg-zinc-200"
            style="position: absolute; bottom: 0; left: {underlineLeft}px; width: {underlineWidth}px;"
        ></div>
    </div>
    {#key section}
        <div class="flex-grow" in:blur={{ duration: 500 }}>
            {#if section == "art"}
                <Characters />
            {:else if section == "music"}
                <Music />
            {/if}
        </div>
    {/key}
</div>

<style>
    .selector-container {
        position: relative;
    }
    .selector-underline {
        transition:
            left 0.15s ease-in-out,
            width 0.15s ease-in-out,
            background-color 0.15s ease-in-out;
    }
</style>
