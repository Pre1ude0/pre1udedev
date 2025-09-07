<script lang="ts">
    import { onMount } from "svelte";
    import { copyToClipboard } from "$lib/utils/copyToClipboard";
    import { arrangeImages } from "$lib/utils/arrangeImages";
    import Eye from "$lib/icons/Eye.svelte";
    import EyeClosed from "$lib/icons/EyeClosed.svelte";

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
                { name: "Sybau", original: "sybau.webp", file: "sybau.png" },
                {
                    name: "Simple gay lol",
                    file: "simplegaylol.png",
                    original: "matthewgaylol.png",
                    description: "A pinterest picture redrawn with our ocs",
                    mentions: [{ text: "@simpleduck", pos: [88, 45] }],
                },
                {
                    name: "Yo wtf...",
                    file: "yowtf.png",
                    original: "yowtf.jpg",
                    description:
                        "Artistic criticism of the absurdness of kanyes stunt",
                    mentions: [{ text: "@kyuqdev", pos: [71, 55] }],
                },
                {
                    name: "Fade",
                    file: "fade.png",
                    original: "chosofade.webp",
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

        window.addEventListener("resize", runArrangeImages);
        window.addEventListener("DOMContentLoaded", runArrangeImages);
        window.addEventListener("load", runArrangeImages);

        return () => {
            if (document.readyState === "complete") {
                window.removeEventListener("resize", runArrangeImages);
                window.removeEventListener(
                    "DOMContentLoaded",
                    runArrangeImages,
                );
                window.removeEventListener("load", runArrangeImages);
                observers.forEach((mo) => mo.disconnect());
                resizeObservers.forEach((ro) => ro.disconnect());
            }
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
                        class="cursor-pointer group absolute w-fit h-fit overflow-hidden hover:scale-105 transition-transform duration-200 select-none rounded-lg border border-zinc-700"
                        href={`/art/${media.file}`}
                        target="_blank"
                        draggable="false"
                        title={media.name}
                    >
                        <img
                            src={`/art/${media.file}`}
                            alt={`${character.name} - ${media.name}`}
                            class="w-full h-auto"
                            draggable="false"
                        />
                        {#if "original" in media && media.original}
                            <button
                                class="peer group absolute w-6 h-6 top-2 right-2 z-20 bg-black/70 rounded-md px-1 py-0.5 text-zinc-300 cursor-grab active:cursor-grabbing"
                                onclick={(event) => {
                                    event.preventDefault();
                                }}
                                title="Hold to peek original"
                            >
                                <Eye
                                    styles="opacity-0 group-active:opacity-100 absolute top-[50%] left-[50%] translate-[-50%] w-4 aspect-square transition-opacity"
                                />
                                <EyeClosed
                                    styles="opacity-100 group-active:opacity-0 absolute top-[50%] left-[50%] translate-[-50%] w-4 aspect-square transition-opacity"
                                />
                            </button>
                            <img
                                src={`/art/original/${media.original}`}
                                alt="original media"
                                class="absolute top-0 left-0 w-full h-full object-contain opacity-0 peer-active:opacity-100 transition-opacity z-10 bg-black/70"
                                draggable="false"
                            />
                        {/if}
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
