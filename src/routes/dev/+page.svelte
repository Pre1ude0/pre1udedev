<script lang="ts">
    import Exp from "$lib/components/ExperienceBox.svelte";
    import { enhancedImages } from "$lib/assets/enhancedImage";
    import Window from "$lib/components/Window.svelte";
    import ArrowOut from "$lib/icons/ArrowOut.svelte";
    import Github from "$lib/icons/Github.svelte";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    const projects = [
        {
            name: "Sampling.lv",
            description: "Website of the Sampling Design office",
            link: "https://sampling.lv",
            image: "sampling.png",
            tech: ["express", "nodejs", "html", "css", "js"],
        },
        {
            name: "Ring-amajig",
            description: "Yet another webring on the web",
            link: "https://ring.pre1ude.dev",
            github: "Pre1ude0/ringamajig",
            image: "ringamajig.png",
            tech: ["svelte", "html", "css", "ts"],
        },
        {
            name: "Latvian Pavilion",
            description:
                "Website of the Latvian Pavillion for the 19th International Architecture Exhibition",
            link: "https://latvianpavilion.sampling-architects.com/",
            image: "latvianpavilion.png",
            tech: ["html", "css", "js"],
        },
        {
            name: "upgrandtour.eu",
            description:
                "Website of the european grand tour preservation project",
            link: "https://upgrandtour.eu",
            image: "upgrandt.png",
            tech: ["express", "nodejs", "html", "css", "js"],
        },
    ];
</script>

<svelte:head>
    <meta name="description" content="Software development and projects" />
    <meta property="og:title" content="Dev | Pre1ude0" />
    <meta
        property="og:description"
        content="Software development and projects"
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://pre1ude.dev/dev" />
    <meta property="og:image" content="https://pre1ude.dev/og-image.png" />
</svelte:head>

<div class="flex flex-col items-center justify-center p-4 gap-6 max-w-[1200px]">
    <Window width={"100%"} path="dev" command="cat about.txt">
        <p class="text-lg text-zinc-300">
            One of my main interests and life long passions that I'd like to
            pursue further professionally is <strong
                >software development</strong
            >.
        </p>
        <p class="text-lg text-zinc-300">
            I've dabbled with quite a bit of different tools and languages, but
            I mainly specialize in <strong>web development</strong>, mainly
            frontend, but backend comes naturally with it.
        </p>
        <p class="text-lg text-zinc-300">
            You can find and maybe even check out some of my favourite projects
            below I've worked on over the years!
        </p>
    </Window>
    <!-- TODO: Fix the in animation not working -->
    <div class="masonry mt-3 w-full col-count-1 sm:col-count-2 col-gap-4">
        {#each projects as p (p.name)}
            <div class="break-inside-avoid mb-6 w-full inline-block">
                <Window
                    width={"100%"}
                    height={"fit-content"}
                    command={`glow "${p.name}"/readme.md`}
                >
                    <div class="flex relative flex-col gap-2 h-fit w-full">
                        <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-full block"
                            title={p.name}
                        >
                            <enhanced:img
                                class="w-full cursor-pointer"
                                alt={p.name}
                                src={enhancedImages[`projects/${p.image}`]}
                            />
                        </a>
                        <div
                            class="w-full h-fit flex flex-col justify-start items-start z-10"
                        >
                            <div class="flex flex-col group">
                                <dev
                                    class="flex flex-col"
                                    href={p.link}
                                    target="_blank"
                                >
                                    <div
                                        class="flex flex-row items-center gap-1"
                                    >
                                        <a
                                            class="text-2xl text-white font-bold hover:underline"
                                            href={p.link}
                                        >
                                            {p.name}
                                        </a>
                                        <div
                                            class="opacity-0 group-hover:opacity-100 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-75"
                                        >
                                            <ArrowOut />
                                        </div>
                                    </div>
                                    {#if p.github}
                                        <a
                                            href={`http://github.com/${p.github}`}
                                            target="_blank"
                                            class="ml-2 hover:underline opacity-50 group-hover:opacity-100 transition-opacity text-sm flex flex-row items-center gap-1"
                                        >
                                            <Github
                                                styles="size-3 inline-block"
                                            />{p.github}
                                        </a>
                                    {/if}
                                </dev>

                                <p class="text-zinc-300 text-lg">
                                    {p.description}
                                </p>
                            </div>
                            <div
                                class="mt-2 w-full flex flex-row items-end justify-start gap-2 h-fit flex-wrap-reverse"
                            >
                                {#each p.tech as tech}
                                    <Exp id={tech} />
                                {/each}
                            </div>
                        </div>
                    </div>
                </Window>
            </div>
        {/each}
    </div>
</div>
