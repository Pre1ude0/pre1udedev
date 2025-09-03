<script lang="ts">
    let { command, children } = $props();
    import { page } from "$app/state";
    import { slide } from "svelte/transition";
    import SidePane from "./SidePane.svelte";
</script>

<div
    class="w-full h-fit flex gap-6 flex-col lg:flex-row items-center lg:items-stretch"
>
    <div
        class="w-full lg:w-auto lg:grow-1 transition-all h-fit bg-zinc-900 p-2 border-b border-zinc-800 flex flex-col items-start px-4 rounded-2xl"
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
