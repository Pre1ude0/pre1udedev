<script lang="ts">
    import { onMount } from "svelte";
    import { preventDefault } from "svelte/legacy";

    const characters = $state([
        {
            name: "Cry0",
            description: "My first character and fursona",
            media: [
                {
                    name: "Cry0",
                    file: "cry0.png",
                    description: "Cry0 character sheet",
                },
                { name: "Pfp showcase", file: "pfpshowcase.png" },
                { name: "Angels in camo", file: "angelsincamo.png" },
                { name: "Mugshot", file: "mugshot.png" },
                { name: "Sybau", file: "sybau.png" },
                {
                    name: "Fade",
                    file: "fade.png",
                    description: "Collab with my friend Kyu",
                    mentions: [{ text: "@kyuqdev", pos: [47, 87] }],
                },
                {
                    name: "Jojo Pose",
                    file: "jojopose.png",
                    description:
                        "An unfinished collab that I spent way too much time on",
                },
            ],
        },
        {
            name: "Other characters/ocs",
            description: "Fan art I've made of other ocs/characters",
            media: [
                {
                    name: "Simple filling out a job application",
                    file: "simplejobapplication.jpg",
                    description:
                        "My friends oc filling out a job application, also my first official piece",
                    mentions: [{ text: "@simpleduck", pos: [38, 57] }],
                },
                {
                    name: "Volkgrid crashout",
                    file: "volkgridcrashout.png",
                    description:
                        "My version of the furry trauma meme with my and my friends ocs instead",
                    mentions: [
                        { text: "Cry0", pos: [30, 70] },
                        { text: "@simpleduck", pos: [50.5, 72] },
                        { text: "@volkgrid", pos: [72, 50] },
                    ],
                },
                {
                    name: "Alex the Hoarder",
                    file: "alexthehoarder.jpg",
                    description:
                        "Fanart of Alex the Hoarder from Ena: dream bbq",
                },
            ],
        },
    ]);

    function arrangeImages(container: HTMLElement) {
        const cards = container.querySelectorAll("a");

        let columnCount = Math.ceil(container.clientWidth / 500);

        const columns = Array(columnCount);

        for (let i = 0; i < columnCount; i++) {
            columns[i] = 0;
        }

        for (let card of cards) {
            if (getComputedStyle(card).display !== "none") {
                const currentColumn = columns.findIndex(
                    (c) => c === Math.min(...columns),
                );

                card.style.left = (currentColumn * 100) / columnCount + "%";
                card.style.top = columns[currentColumn] + "px";

                card.style.width = `calc(${100 / columnCount}% - 20px)`;

                const cardSize = card.getBoundingClientRect();
                columns[currentColumn] += cardSize.height + 16;
            }
            container.style.height = Math.max(...columns) + "px";
        }
    }

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).catch((err) => {
            console.error("Could not copy text: ", err);
        });
    }

    onMount(() => {
        function runArrangeImages() {
            for (let character of characters) {
                const container = document.getElementById(character.name);
                if (container) {
                    arrangeImages(container);
                }
            }
        }

        // Observe container size changes and re-run arrangeImages
        const observers: MutationObserver[] = [];
        const resizeObservers: ResizeObserver[] = [];

        for (let character of characters) {
            const container = document.getElementById(character.name);
            if (container) {
                // Observe DOM mutations (e.g., images loading in/out)
                const mo = new MutationObserver(runArrangeImages);
                mo.observe(container, { childList: true, subtree: true });
                observers.push(mo);

                // Observe size changes
                const ro = new ResizeObserver(runArrangeImages);
                ro.observe(container);
                resizeObservers.push(ro);
            }
        }

        return () => {
            window.removeEventListener("resize", runArrangeImages);
            window.removeEventListener("DOMContentLoaded", runArrangeImages);
            window.removeEventListener("load", runArrangeImages);
            observers.forEach((mo) => mo.disconnect());
            resizeObservers.forEach((ro) => ro.disconnect());
        };
    });
</script>

<div class="flex flex-col gap-3 min-h-[100vh] p-2">
    <h1 class="text-6xl text-white mb-3">Art gallery</h1>
    {#each characters as character}
        <div class="flex flex-col gap-2">
            <h2
                class="text-4xl text-zinc-100 font-(family-name:--font-geist-mono)"
            >
                {character.name}
            </h2>
            <p class="text-zinc-300 text-lg">{character.description}</p>
            <div class="relative w-full" id={character.name}>
                {#each character.media as media}
                    <a
                        class="cursor-pointer group absolute w-fit h-fit overflow-hidden hover:scale-105 transition-transform duration-200"
                        href={`/art/${media.file}`}
                        target="_blank"
                    >
                        <img
                            src={`/art/${media.file}`}
                            alt={`${character.name} - ${media.name}`}
                            class="w-full h-auto rounded-lg border border-zinc-700"
                            title={media.name}
                        />
                        {#if media.mentions}
                            {#each media.mentions as mention}
                                <button
                                    class="absolute text-xs text-zinc-300 cursor-pointer
                                    bg-black/70 rounded-md px-1 py-0.5 z-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition o"
                                    style="
                                        top: {mention.pos[1]}%;
                                        left: {mention.pos[0]}%;
                                        transform: translate(-50%, -50%);
                                    "
                                    title="Click to copy"
                                    onclick={() => {
                                        event!.preventDefault();
                                        copyToClipboard(mention.text);
                                    }}
                                >
                                    <div
                                        class="absolute -top-[5px] left-1/2 -translate-x-1/2"
                                        style="
                                            width: 0;
                                            height: 0;
                                            border-left: 5px solid transparent;
                                            border-right: 5px solid transparent;

                                            border-bottom: 5px solid black;
                                            opacity: 0.7;

                                            /* yeah idk why I couldn't do this in tailwind :p */
                                        "
                                    ></div>
                                    <span>{mention.text}</span>
                                </button>
                            {/each}
                        {/if}
                        {#if media.description}
                            <span
                                class="absolute z-10 bottom-0 left-0 m-2 box-border opacity-0 -translate-x-10 translate-y-10 group-hover:translate-0 group-hover:opacity-100 transition bg-black/70 text-zinc-300 text-sm rounded-md px-2 py-1"
                            >
                                {media.description}
                            </span>
                        {/if}
                    </a>
                {/each}
            </div>
        </div>
    {/each}
</div>
