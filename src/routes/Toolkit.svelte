<script lang="ts">
    import Exp from "./ExperienceBox.svelte";
    import { elasticOut } from "svelte/easing";

    let toolkit = $state([
        {
            text: "Svelte",
            icon: "nf-dev-svelte",
            styles: "bg-[#f96743] text-white",
        },
        {
            text: "HTML",
            icon: "nf-dev-html5",
            styles: "bg-[#e34f26] text-white",
        },
        {
            text: "CSS",
            icon: "nf-custom-css",
            styles: "bg-[rebeccapurple] text-white",
        },
        {
            text: "TS",
            icon: "nf-dev-typescript",
            styles: "bg-[#3178c6] text-white",
        },
        {
            text: "Git",
            icon: "nf-dev-git",
            styles: "bg-[#e24329] text-white",
        },
        {
            text: "Linux",
            icon: "nf-oct-command_palette",
            styles: "bg-black text-white",
        },
        {
            text: "Python",
            icon: "nf-dev-python",
            styles: "bg-[#ffde57] text-black",
        },
        {
            text: "Docker",
            icon: "nf-dev-docker",
            styles: "bg-[#2496ed] text-white",
        },
        {
            text: "tailwindcss",
            icon: "nf-dev-tailwindcss",
            styles: "bg-[#06b6d4] text-white",
        },
        {
            text: "JS",
            icon: "nf-fa-js",
            styles: "bg-[#f7df1e] text-black",
        },
        {
            text: "NodeJS",
            icon: "nf-md-nodejs",
            styles: "bg-[#215732] text-white",
        },
        {
            text: "Express",
            icon: "nf-dev-express",
            styles: "bg-gray-800 text-white",
        },
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
        <Exp
            text={item.text}
            icon={item.icon}
            styles={item.styles}
            delay="{i * 70}ms"
            animName={currentAnim}
        />
    {/each}
</div>
