<script lang="ts">
    import { enhancedImages } from "$lib/assets/enhancedImage";
    import { blur } from "svelte/transition";

    type Art = {
        file: string;
        bannerPos: number;
        name: string;
        description: string;
    };

    const arts = [
        {
            file: "newdesign.jpg",
            bannerPos: 67,
            name: "Cry0 with blahaj",
            description:
                "A drawing of my oc Cry0 I made while on a trip to Ireland with my choir",
        },
        {
            file: "marathon-sona.png",
            bannerPos: 12,
            name: "Marathon shell-sona",
            description:
                "A design of my sona inspired by the shells from <a class='underline' href='https://marathonthegame.com/' target='_blank'>Marathon the game</a>",
        },
        {
            file: "whydisfellasomad.png",
            bannerPos: 10,
            name: "Why this fella so mad",
            description:
                "A meme post based on the <a class='underline' href='https://knowyourmeme.com/memes/why-dis-nigga-look-so-mad' target='_blank'>Why this 🥷 so mad</a> meme with my friend <a class='underline' href='https://kyuqdev.pages.dev' target='_blank'>Kyu</a>",
        },
        {
            file: "sinnersona.png",
            bannerPos: 50,
            name: "Sinner-sona",
            description:
                "A sinner-sona design from the discontinued game Grace on Roblox",
        },
        {
            file: "breachofcontract.jpg",
            bannerPos: 50,
            name: "Breach of contract",
            description:
                "Fanart of the sona of my friend <a class='underline' href='https://volkgrid.world' target='_blank'>Volkgrid</a>",
        },
    ];

    let selected: Art | null = $state(arts[0] || null);
</script>

<div
    class="flex flex-col md:flex-row gap-1 h-auto md:h-full w-full overflow-auto"
>
    <div class="flex flex-col justify-between w-full md:w-120">
        <div class="flex flex-col items-start gap-1 h-[500px] md:h-2/3">
            {#each arts as art}
                <button
                    class="flex flex-col justify-end gap-2 p-3 w-full flex-1 hover:flex-2 transition-all duration-200 bg-center bg-cover group cursor-pointer"
                    style={`background-image: url("${enhancedImages[`art/${art.file}`]}"); background-position: 0% ${art.bannerPos}%;`}
                    aria-label={art.name}
                    onclick={() => (selected = art)}
                >
                    <h2
                        class="text-3xl text-white opacity-0 group-hover:opacity-100 transition-opacity text-left filter drop-shadow-[0_0_2px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_6px_rgba(0,0,0,0.95)]"
                    >
                        {art.name}
                    </h2>
                </button>
            {/each}
        </div>
        {#if selected}
            {#key selected}
                <div
                    in:blur={{ duration: 200 }}
                    class="w-full hidden md:flex flex-col gap-1 h-fit p-3"
                >
                    <h1 class="text-3xl">{selected?.name}</h1>
                    <p class="text-lg leading-5 text-zinc-300">
                        {@html selected?.description}
                    </p>
                </div>
            {/key}
        {/if}
    </div>
    {#key selected}
        <div
            class="flex flex-1 items-start justify-center"
            in:blur={{ duration: 200 }}
        >
            {#if selected}
                <enhanced:img
                    src={enhancedImages[`art/${selected.file}`]}
                    alt={selected.name}
                    class="max-h-full max-w-full"
                />
            {/if}
        </div>
    {/key}
    {#if selected}
        {#key selected}
            <div
                in:blur={{ duration: 200 }}
                class="w-full flex md:hidden flex-col gap-1 h-fit p-3"
            >
                <h1 class="text-3xl">{selected?.name}</h1>
                <p class="text-lg leading-5 text-zinc-300">
                    {@html selected?.description}
                </p>
            </div>
        {/key}
    {/if}
</div>
