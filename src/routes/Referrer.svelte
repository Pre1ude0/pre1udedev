<script lang="ts">
    import "$lib/styles/prettify.css";
    import { onMount } from "svelte";
    import { addCopyButtons, applyPrettyPrint } from "$lib/utils/copyButton";
    import { page } from "$app/state";
    import Window from "$lib/components/Window.svelte";

    let buttons = [
        {
            src: "/blankie.png",
            alt: "latest",
            snippet: "/snippet.html",
        },
        {
            src: "/blankies/city.png",
            alt: "v3",
            snippet: "/blankies/snippets/snippet-v3.html",
        },
        {
            src: "/blankies/blankie-v2.png",
            alt: "v2",
            snippet: "/blankies/snippets/snippet-v2.html",
        },
        {
            src: "/blankies/blankie-v1.png",
            alt: "v1",
            snippet: "/blankies/snippets/snippet-v1.html",
        },
        {
            src: "/blankies/blankie-legacy.png",
            alt: "legacy",
            snippet: "/blankies/snippets/snippet-legacy.html",
        },
    ];

    let selected = $state(buttons[0]);
    let preview: HTMLPreElement | null = $state(null);
    let snippet = $derived(`
<a href="https://pre1ude.dev" target="_blank">
    <img
        src="https://pre1ude.dev${selected.src}"
        height="31"
        width="88"
        alt="pre1ude.dev"
    />
</a>
`);

    function switchPreview() {
        if (!preview || !snippet) return;

        applyPrettyPrint(preview, snippet);
        addCopyButtons(preview);
    }

    $effect(() => {
        switchPreview();
    });
</script>

<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"
    ></script>
</svelte:head>

{#if page.url.hash === "#blankie"}
    <div
        class="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-3 z-200 overflow-hidden p-2"
    >
        <Window styles="w-full md:w-[700px]" command="glow ref.md">
            <div class="w-full h-fit flex flex-col items-start gap-3">
                <div class="flex flex-wrap gap-3 items-start">
                    {#each buttons as b}
                        <button
                            onclick={() => {
                                selected = b;
                            }}
                            title={"Show " + b.alt + " snippet"}
                            class="relative hover:-translate-y-1/10 transition-transform cursor-pointer group"
                        >
                            <img
                                src={b.src}
                                alt={b.alt}
                                width="88"
                                height="31"
                                class="{b.src == selected.src
                                    ? 'border-green-300'
                                    : 'border-zinc-800'} border box-content transition-colors image-rendering-pixelated"
                            />
                            <span
                                class="opacity-0 text-zinc-300 font-geist-mono -z-10 absolute -bottom-6 left-1/2 -translate-x-[50%] group-hover:opacity-100 transition-all duration-200 ease-out -translate-y-4 group-hover:translate-y-0"
                                style="display: inline-block;"
                            >
                                {b.alt}
                            </span>
                        </button>
                        {#if b == buttons[0]}
                            <div class="h-4 w-[2px] bg-zinc-700 mt-2"></div>
                        {/if}
                    {/each}
                </div>
            </div>

            <pre class="prettyprint lang-html" bind:this={preview}></pre>
            <a href="/" class="self-end hover:underline text-sm">Go back</a>
        </Window>
    </div>
{/if}
