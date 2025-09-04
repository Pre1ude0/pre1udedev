<script lang="ts">
    import Exp from "$lib/components/ExperienceBox.svelte";
    import { elasticOut } from "svelte/easing";

    let toolkit = $state([
        "svelte",
        "html",
        "css",
        "ts",
        "git",
        "linux",
        "python",
        "docker",
        "tailwindcss",
        "js",
        "nodejs",
        "express",
    ]);

    function shuffleToolkit() {
        for (let i = toolkit.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [toolkit[i], toolkit[j]] = [toolkit[j], toolkit[i]];
        }
    }

    let currentAnim = $state<string>("");
    let spinCount = $state(0);
    let hoverShuffle = $state(false);

    function handleShuffle() {
        shuffleToolkit();
        currentAnim = currentAnim === "jumpA" ? "jumpB" : "jumpA";
        spinCount += 1;
    }

    handleShuffle();

    function spin(
        node: HTMLElement,
        params: {
            duration?: number;
            degrees?: number;
            easing?: (t: number) => number;
        },
    ) {
        const existingTransform = getComputedStyle(node).transform.replace(
            "none",
            "",
        );

        return {
            delay: 0,
            duration: params.duration || 400,
            easing: params.easing || elasticOut,
            css: (t: any, u: any) =>
                `transform: ${existingTransform} rotate(${t * (params.degrees || 360)}deg)`,
        };
    }
</script>

<h2 class="text-3xl mt-5 flex items-center gap-3">
    {#key spinCount}
        <div
            style="
                transform: translateX({hoverShuffle ? '4px' : '0'});
                transition: transform 0.2s var(--overshoot);
                "
        >
            <button
                class="cursor-pointer text-zinc-300 flex mt-1.5 items-center justify-center ease-(--overshoot) text-2xl"
                onclick={handleShuffle}
                aria-label="Shuffle toolkit"
                in:spin={{ duration: 600 }}
                onmouseenter={() => (hoverShuffle = true)}
                onmouseleave={() => (hoverShuffle = false)}
                title="Shuffle toolkit"
            >
                <i class="nf nf-fa-shuffle"></i>
            </button>
        </div>
    {/key}
    Toolkit:
</h2>
<div class="experience flex h-fit flex-wrap w-4/5 p-3 pl-0 gap-2">
    {#each toolkit as item, i}
        <Exp id={item} delay="{i * 70}ms" animName={currentAnim} />
    {/each}
</div>
