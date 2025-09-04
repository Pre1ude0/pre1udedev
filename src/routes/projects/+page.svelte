<script lang="ts">
    const projects = [
        {
            name: "Sampling.lv",
            description: "Website of the Sampling Design office",
            link: "https://sampling.lv",
            image: "/projects/sampling.png",
        },
        {
            name: "Ring-amajig",
            description: "Yet another webring on the web",
            link: "https://ring.pre1ude.dev",
            github: "Pre1ude0/ring-amajig",
            image: "/projects/ringamajig.png",
        },
        {
            name: "upgrandtour.eu",
            description:
                "Website of the european grand tour preservation project",
            link: "https://upgrandtour.eu",
            image: "/projects/upgrandt.png",
        },
        {
            name: "Insermius bot",
            description:
                "A hobby project discord bot. Developed when I was learning the basic ropes of development",
            link: "https://insermius.pre1ude.dev",
            github: "insermius-dev/insermius-bot",
            image: "/projects/insermius.png",
        },
    ];
</script>

<div class="flex flex-row flex-wrap items-start justify-start gap-6">
    {#each projects as project}
        <div
            class="overflow-hidden w-130 h-80 mb-4 bg-zinc-900 rounded-2xl border border-zinc-800"
        >
            <img
                src={project.image}
                alt={project.name}
                class="w-full h-40 object-cover hover:object-contain mb-2 transition-all"
            />
            <div class="flex flex-col gap-2 p-4">
                <div class="flex flex-row justify-between w-full">
                    <h2 class="text-xl font-bold text-zinc-100 mb-1">
                        {project.name}
                    </h2>
                    <div class="flex flex-row gap-3 text-zinc-300 text-lg">
                        {#if project.link}
                            <a
                                class="outline-1 p-1 aspect-square flex items-center justify-center rounded-sm hover:bg-zinc-800 transition-colors"
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit website"
                                ><i class="nf nf-fa-globe"></i></a
                            >
                        {/if}
                        {#if project.github}
                            <a
                                class="outline-1 p-1 aspect-square flex items-center justify-center rounded-sm hover:bg-zinc-800 transition-colors"
                                href={"https://github.com/" + project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View source on GitHub"
                                ><i class="nf nf-fa-github"></i></a
                            >
                        {/if}
                    </div>
                </div>
                <p class="text-zinc-300 mb-2">{project.description}</p>
            </div>
        </div>
    {/each}
</div>
