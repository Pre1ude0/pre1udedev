<script lang="ts">
    import "$lib/styles/prettify.css";
    import { onMount } from "svelte";
    import { addCopyButtons, applyPrettyPrint } from "$lib/utils/copyButton";

    let buttons = [
        {
            src: "/blankie.png",
            alt: "latest",
            snippet: "/snippet.html",
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

    let previews: Array<string> = [];
    let currentPreview: number = $state(0);

    onMount(async () => {
        for (let i = 0; i < buttons.length; i++) {
            await fetch(buttons[i].snippet)
                .then((res) => res.text())
                .then((text) => {
                    previews.push(text);
                });
        }

        const pre = document.getElementById("preview");
        if (!pre) return;

        applyPrettyPrint(pre, previews[0] || "");
        addCopyButtons(pre);
    });

    function switchPreview(index: number) {
        const pre = document.getElementById("preview");
        if (!pre || !previews[index]) return;

        currentPreview = index;
        applyPrettyPrint(pre, previews[index]);
        addCopyButtons(pre);
    }
</script>

<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"
    ></script>
</svelte:head>

<div class="w-full h-fit flex flex-col items-start gap-3 mt-5">
    <h3 class="text-2xl">My buttons</h3>
    <div class="flex flex-wrap items-center gap-3">
        {#each buttons as button, i}
            <button
                onclick={() => switchPreview(i)}
                title={"Show " + button.alt + " snippet"}
                class="relative hover:-translate-y-1/10 transition-transform cursor-pointer group"
                style="animation-delay: {i * 100}ms; "
            >
                <img
                    src={button.src}
                    alt={button.alt}
                    width="88"
                    height="31"
                    class="{i == currentPreview
                        ? 'border-green-300'
                        : 'border-zinc-800'} border transition-colors"
                />
                <span
                    class="opacity-0 text-zinc-300 font-(family-name:--font-geist-mono) -z-10 absolute -bottom-6 left-1/2 -translate-x-[50%] group-hover:opacity-100 transition-all duration-200 ease-out -translate-y-4 group-hover:translate-y-0"
                    style="display: inline-block;"
                >
                    {button.alt}
                </span>
            </button>
            {#if i == 0}
                <div class="h-4 w-[2px] bg-zinc-700"></div>
            {/if}
        {/each}
    </div>
</div>

<pre class="prettyprint lang-html" id="preview"></pre>
