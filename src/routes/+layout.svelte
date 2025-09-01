<script lang="ts">
    import favicon from "$lib/assets/favicon.ico";
    import Moon from "$lib/icons/Moon.svelte";
    import CmdPrompt from "./CmdPrompt.svelte";
    import { tweened } from "svelte/motion";
    import { page } from "$app/state";
    import { cubicOut } from "svelte/easing";
    import { onMount } from "svelte";

    let { children } = $props();
    import "../app.css";

    const items = ["Home", "Projects", "Links"];
    let showSelector: number = $state(0);

    let containerEl: HTMLElement;
    const left = tweened(0, { duration: 200, easing: cubicOut });
    const width = tweened(0, { duration: 200, easing: cubicOut });

    function moveBack() {
        if (!containerEl) return;
        const activeItem = Array.from(containerEl.children).find(
            (child) =>
                child instanceof HTMLAnchorElement &&
                (child as HTMLAnchorElement).getAttribute("href") ===
                    `/${page.url.pathname === "/" ? "" : page.url.pathname.slice(1)}`,
        ) as HTMLElement;
        if (activeItem) {
            const rect = activeItem.getBoundingClientRect();
            const crect = containerEl.getBoundingClientRect();
            left.set(rect.left - crect.left);
            width.set(rect.width);
        }
    }

    function activate(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        if (!containerEl) return;
        const rect = target.getBoundingClientRect();
        const crect = containerEl.getBoundingClientRect();
        left.set(rect.left - crect.left);
        width.set(rect.width);
    }

    function handleMouseLeave(e: MouseEvent) {
        if (
            e.relatedTarget instanceof Node &&
            containerEl.contains(e.relatedTarget)
        )
            return;

        moveBack();
    }

    let command: string = $state(
        `glow ${page.url.pathname === "/" ? "home" : page.url.pathname.slice(1)}.md`,
    );

    onMount(() => {
        moveBack();
        showSelector = 1;
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full m flex items-start justify-center">
    <div class="w-full max-w-[1200px]">
        <div
            class="w-full h-fit bg-zinc-900 border-b border-zinc-800 flex gap-4 items-center px-4 rounded-2xl mb-6"
        >
            <Moon styles="text-zinc-300 w-6" />
            <nav
                bind:this={containerEl}
                onmouseleave={handleMouseLeave}
                class="relative flex gap-2 text-white h-full select-none items-center"
            >
                <div
                    class="absolute top-1/2 -translate-y-1/2 bg-zinc-800/70 rounded-md pointer-events-none transition-opacity duration-150 h-3/4"
                    style="
                        left: {$left}px;
                        width: {$width}px;
                        opacity: {showSelector};
                    "
                ></div>

                {#each items as label}
                    <a
                        href="/{label === 'Home' ? '' : label.toLowerCase()}"
                        class="relative z-10 px-3 p-3 cursor-pointer rounded-md text-xl font-medium hover:text-zinc-100 text-zinc-300 transition-colors duration-150"
                        onmouseenter={activate}
                        onclick={() => {
                            command = `glow ${label.toLowerCase()}.md`;
                        }}
                    >
                        {label}
                    </a>
                {/each}
            </nav>
        </div>
        <div class="relative w-full h-fit">
            <CmdPrompt {command} {children} />
        </div>
    </div>
</div>
