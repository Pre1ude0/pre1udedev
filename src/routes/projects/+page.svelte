<script lang="ts">
    import Exp from "$lib/components/ExperienceBox.svelte";

    const projects = [
        {
            name: "Sampling.lv",
            description: "Website of the Sampling Design office",
            link: "https://sampling.lv",
            image: "/projects/sampling.png",
            tech: ["express", "nodejs", "html", "css", "js"],
        },
        {
            name: "Ring-amajig",
            description: "Yet another webring on the web",
            link: "https://ring.pre1ude.dev",
            github: "Pre1ude0/ring-amajig",
            image: "/projects/ringamajig.png",
            tech: ["svelte", "html", "css", "ts", "linux"],
        },
        {
            name: "upgrandtour.eu",
            description:
                "Website of the european grand tour preservation project",
            link: "https://upgrandtour.eu",
            image: "/projects/upgrandt.png",
            tech: ["express", "nodejs", "html", "css", "js"],
        },
        {
            name: "Insermius bot",
            description:
                "A hobby project discord bot. Developed when I was learning the basic ropes of development",
            link: "https://insermius.pre1ude.dev",
            github: "insermius-dev/insermius-bot",
            image: "/projects/insermius.png",
            tech: ["python"],
        },
    ];
</script>

<div class="flex flex-col gap-8">
    {#each projects as p}
        <div
            class="flex relative flex-col gap-4 h-fit lg:h-80 w-full overflow-hidden rounded-2xl items-end justify-end bg-black group"
        >
            <img
                class="absolute top-0 left-0 w-full object-cover h-full group-hover:scale-105 blur-sm group-hover:blur-none motion-reduce:transition-none transition duration-500"
                style="mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0, rgba(0,0,0,0) 100%)"
                alt={p.name}
                src={p.image}
            />
            <div
                class="w-full h-fit p-6 flex flex-col lg:flex-row justify-between items-start lg:items-end z-10"
            >
                <div class="flex flex-col gap-2">
                    <h2 class="text-7xl text-white font-bold">
                        {p.name}
                    </h2>
                    <p class="text-zinc-300 text-4xl">{p.description}</p>
                    <div class="flex flex-row gap-2 items-center">
                        {#if p.github}
                            <a
                                href={"https://github.com/" + p.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-zinc-400
                        underline text-2xl hover:text-zinc-200 transition-colors"
                                >source code</a
                            >
                        {/if}
                        {#if p.link && p.github}
                            <span class="text-zinc-400 text-xl">•</span>
                        {/if}
                        {#if p.link}
                            <a
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-zinc-400
                        underline text-2xl hover:text-zinc-200 transition-colors"
                                >visit site</a
                            >
                        {/if}
                    </div>
                </div>
                <div
                    class="w-full mt-2 lg:w-1/4 flex flex-row items-end justify-start lg:justify-end gap-2 h-fit flex-wrap-reverse"
                >
                    {#each p.tech as tech}
                        <Exp id={tech} />
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</div>
