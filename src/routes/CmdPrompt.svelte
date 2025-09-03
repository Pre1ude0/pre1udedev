<script lang="ts">
    let { command, children } = $props();
    import { page } from "$app/state";
    import { slide } from "svelte/transition";
    import SidePane from "./SidePane.svelte";
    import { onMount } from "svelte";

    let width: string = $state("w-full");
    setWidth();

    function setWidth() {
        switch (page.url.pathname) {
            case "/": {
                width = "w-[calc(100%-424px)]";
                break;
            }
            default: {
                width = "w-full";
            }
        }
    }

    $effect(setWidth);
</script>

<div class="w-full h-fit flex gap-6 flex-col lg:flex-row">
    <div
        class="w-full lg:{width} transition-all h-fit bg-zinc-900 p-2 border-b border-zinc-800 flex flex-col items-start px-4 rounded-2xl"
    >
        <span
            class="w-full h-6 flex flex-row items-center gap-2 text-zinc-400 font-(family-name:--font-geist-mono)"
        >
            root@pre1ude.dev
            <span class="text-zinc-200">$</span>
            <span class="w-fit">{command}</span>
        </span>
        {#key page.url.pathname}
            <div
                transition:slide={{ duration: 300 }}
                class="w-full mt-2 mb-4 h-fit"
            >
                {@render children()}
            </div>
        {/key}
    </div>

    <SidePane />
</div>
